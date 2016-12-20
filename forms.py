from flask_wtf import FlaskForm as Form
from wtforms import TextField, SubmitField, validators, TextAreaField, BooleanField

class ContactForm(Form):
  name = TextField("Nombre")
  email = TextField("Correo Electronico")
  subject = TextField("Asunto")
  message = TextAreaField("Mensaje")
  submit = SubmitField("Envia")

class SubForm(Form):
  email = TextField("Correo Electronico")
  submit = SubmitField("Envia")
  pred = BooleanField("Incluir prediccion de los proximos dias (AEMET)")


