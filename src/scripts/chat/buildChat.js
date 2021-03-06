/*
/	Module:		 Build Chat
/	Author: 	 Levi Schubert
/	Description: The module responsible for building the chat panel
/				 on the dom and initializing all chat modules
*/

const $ = require("jquery")
const print = require("./printChat")
const retrieve = require("./retrieveChat")
const api = require("../api/APIManager")
const user = require("../registration/UserManager")
const chatStorage = require("./chatStorage")

const chatActor = Object.create(null, {
	buildChat:
		{
			value: function() {
				const chatRef = $("#main-page")
				
				let chatbox = `
					<div id="chat">
						<div id="chatBox"></div>
						<div id="chatInputSection">
							<input type="text" id="chatInput">
						</div>
					</div>`
				
				chatRef.append(chatbox)
				this.init()
			}
		},
	init:{
		value: function() {
			//todo add event listener on enter key press in form
			const input = $("#chatInput")
			input.on("keyup", function(event) {
				// debugger
				if (event.keyCode === 13 && input.val() !== "") {
					let text = input.val()
					let data = {
						"userID": user.currentUser(),
						"message": text,
						"timeStamp": Date.now()
					}
					input.val("")
					api.createItem("messages", data)
					chatStorage.save(data)
					retrieve.onCreate(data)
				}
			})
			retrieve.init()
			
		}
	}
})

module.exports = chatActor