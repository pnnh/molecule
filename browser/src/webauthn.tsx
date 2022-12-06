
  // Base64 to ArrayBuffer
function bufferDecode(value: string) {
  let buffer = atob(value);
  //let buffer = Buffer.from(value, 'base64');
  return Uint8Array.from(buffer, c => c.charCodeAt(0));
}

function bufferEncode(value: string) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(value)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");;
}
  
export function registerUser(username: string) {
   
  if (username === "") {
    alert("Please enter a username");
    return;
  }
  
  fetch(
    '/register/begin/' + username,
    {method: 'GET'})
    .then((credentialCreationOptions) => {
      console.log("credentialCreationOptions", credentialCreationOptions)
      credentialCreationOptions.publicKey.challenge = bufferDecode(credentialCreationOptions.publicKey.challenge);
      credentialCreationOptions.publicKey.user.id = bufferDecode(credentialCreationOptions.publicKey.user.id);
      if (credentialCreationOptions.publicKey.excludeCredentials) {
        for (var i = 0; i < credentialCreationOptions.publicKey.excludeCredentials.length; i++) {
          credentialCreationOptions.publicKey.excludeCredentials[i].id = bufferDecode(credentialCreationOptions.publicKey.excludeCredentials[i].id);
        }
      }
  
      return navigator.credentials.create({
        publicKey: credentialCreationOptions.publicKey
      })
    })
    .then((credential) => {
      console.log("credential", credential)
      let attestationObject = credential.response.attestationObject;
      let clientDataJSON = credential.response.clientDataJSON;
      let rawId = credential.rawId;
  
      fetch(
        '/register/finish/' + username,
        {
          method: 'POST',
          body: JSON.stringify({
            id: credential.id,
          rawId: bufferEncode(rawId),
          type: credential.type,
          response: {
            attestationObject: bufferEncode(attestationObject),
            clientDataJSON: bufferEncode(clientDataJSON),
          },
          })
          
        })
    })
    .then((success) => {
      alert("successfully registered " + username + "!")
  
      return
    })
    .catch((error) => {
      console.log(error)
      alert("failed to register " + username)
    })
}
  
export async  function loginUser(username: string) {
    
  if (username === "") {
    alert("Please enter a username");
    return;
  }
  
  try {
     
  let response = await fetch('/login/begin/' + username, {method: 'GET'});

    let credentialRequestOptions = await response.json();
      console.log("credentialRequestOptions", credentialRequestOptions)
      credentialRequestOptions.publicKey.challenge = bufferDecode(credentialRequestOptions.publicKey.challenge);
      credentialRequestOptions.publicKey.allowCredentials.forEach(function (listItem) {
        listItem.id = bufferDecode(listItem.id)
      });
  
      let assertion = await navigator.credentials.get({
        publicKey: credentialRequestOptions.publicKey
      })
      console.log("assertion", assertion)
      let authData = assertion.response.authenticatorData;  
      let clientDataJSON = assertion.response.clientDataJSON;
      let rawId = assertion.rawId;
      let sig = assertion.response.signature;
      let userHandle = assertion.response.userHandle;
  
  let finishResponse =      await fetch(
        '/login/finish/' + username,
        {method: 'POST', headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      body: JSON.stringify({
        id: assertion.id,
        rawId: bufferEncode(rawId),
        type: assertion.type,
        response: {
          authenticatorData: bufferEncode(authData),
          clientDataJSON: bufferEncode(clientDataJSON),
          signature: bufferEncode(sig),
          userHandle: bufferEncode(userHandle),
        },
      })})
    
     let finishJson = await finishResponse.json();
     console.log("successfully logged in " + username + "!", finishJson)
   
     const urlParams = new URLSearchParams(window.location.search);
     let myParam = urlParams.get('redirect'); 
     console.log("redirect",  window.location.host + myParam) 
     if (!myParam) {
       myParam = '/login'
     }
     window.location.href= myParam  
    } catch(error) {
 
      console.error("failed to register " + username, error)
    }
}
  