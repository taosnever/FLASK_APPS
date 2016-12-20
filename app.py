from flask import Flask, jsonify, session, redirect, url_for, escape, request, render_template
import requests, json
from forms import ContactForm, SubForm
from flask_mail import Message, Mail
from flask_pymongo import PyMongo

mail = Mail()

app = Flask(__name__)

app.secret_key = 'development key'

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = 'contacto.meteofib@gmail.com'
app.config["MAIL_PASSWORD"] = '123456789ABC'

mail.init_app(app)

app.config['MONGO_DBNAME'] = 'suscripcion'

mongo = PyMongo(app)

@app.route('/')
def home():
	return render_template('home.html')

@app.route('/home.html')
def homeHTML():
	return render_template('home.html')

@app.route('/contacto.html', methods=['GET', 'POST'])
def contactoHTML():
	form = ContactForm()

	if request.method == 'POST':
		msg = Message(form.subject.data, sender='contacto.meteofib@gmail.com', recipients=['contacto.meteofib@gmail.com'])
		msg.body = """
		De: %s <%s>\n
 		%s
    		""" % (form.name.data, form.email.data, form.message.data)
    		mail.send(msg)

    		return render_template('formulario.html', success=True)

  	elif request.method == 'GET':
		return render_template('formulario.html', form=form)
	
@app.route('/estadisticas.html')
def estadisticasHTML():
	return render_template('estadisticas.html')

@app.route('/medicion.html')
def medicionHTML():
	return render_template('medicion.html')

@app.route('/nosotros.html')
def nosotrosHTML():
	return render_template('nosotros.html')

@app.route('/sub.html', methods=['GET', 'POST'])
def subHTML():
	form = SubForm()
	
	if request.method == 'POST':

		email = form.email.data
		pred = form.pred.data
		
		usuarios = mongo.db.infoUsuariosSub
    		usuarios.insert({'email' : email, 'prediccion' : pred})
				
        	return render_template('formularioSub.html', success=True)
	elif request.method == 'GET':
        	return render_template('formularioSub.html', form=form)

@app.route('/rest')
def rest():
	try:
		url = 'http://10.192.142.204/tiempoHoy'
		r = requests.get(url)
		return r.text

	except:
		return 'Error in REST connection'


@app.route('/En2kxx9P46q66bayBAbdXSP3X6I6QtixyQE6ZVknrT4/hxA+oZTu1ilWtHH0N8dG') #envioEmailSub   K->meteoFIB
def envioEmailSub():
	us = mongo.db.infoUsuariosSub

        for info in us.find():
                msgSub = Message('Informe semanal MeteoFIB', sender='contacto.meteofib@gmail.com', recipients=[info['email']])
                msgSub.body = """
                %s \n
                %s %s""" % ('MeteoFIB', 'Gracias por contar con nuestro servicio. A continuacion puede acceder a la informacion de nuestra estacion para esta semana. ' ,'http://fearow.fib.upc.es/infoSuscripcion/')

                if info['prediccion']:
                        msgSub.body += '200'
                else:
                        msgSub.body += '0'

                msgSub.body += '\n\n\n\n                Si desea cancelar su suscripcion puede hacerlo a traves del siguiente enlace http://fearow.fib.upc.es/cancelSub/'
                msgSub.body += info['email']
                
                mail.send(msgSub)

        return 'Enviado correctamente\n'


@app.route('/infoSuscripcion/<predic>')
def infoUserSub(predic):
	if (predic == '200'):	
		return render_template('infoPredExtra.html', pred=True)  
	else:
		return render_template('infoPredExtra.html', pred=False)



@app.route('/cancelSub/<emailSub>')
def delUserSub(emailSub):
        us = mongo.db.infoUsuariosSub
	us.delete_one({'email' : emailSub})

	return render_template('cancelSub.html')


if __name__ == '__main__':
        app.run()
