console.log('js file')

const weatherform = document.querySelector('form')
const formData = document.querySelector('input') 
const loading_message = document.querySelector('#loading_message')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


loading_message.textContent= ''
message1.textContent = ''
message2.textContent = ''

weatherform.addEventListener('submit',(event)=>{
	event.preventDefault()
	const location = formData.value

	loading_message.innerHTML= '<font color="green">Loading ...</font>'
	message1.textContent = ''
	message2.textContent = ''


	fetch('http://localhost:3000/weather?address='+location).then((response) => {
		response.json().then((data) => {
			if(data.error) 
			{
				loading_message.textContent= ''
				message1.innerHTML = '<font color="red">'+data.error+'</font>'
				message2.textContent = ''
			}
			else
			{
				loading_message.textContent= ''
				message1.innerHTML = '<font color="blue">'+data.Location+'</font>'
				message2.innerHTML = data.Data
			}
		})
	})
})