import twilio from 'twilio'
import "dotenv/config";

const adminNumber = "+5493415119134"

const accountSid = process.env.TWILIOID
const authToken = process.env.TWILIOTOKEN

const client = twilio(accountSid, authToken)

export default async(carrito) => {
    try {
        const message = await client.messages.create({
           body: 'Pedido realizado con exito de ' + carrito.usuario + " con ID " + carrito.id,
           from: 'whatsapp:+12567120062',
           to: 'whatsapp:+' + adminNumber
        })
        console.log(message)
     } catch (error) {
        console.log(error)
     }
}
