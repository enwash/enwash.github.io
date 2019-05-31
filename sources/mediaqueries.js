    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDDzMxhv8Rdkag_BpYey3_8zk0x6g72FY8",
        authDomain: "qry-shortener.firebaseapp.com",
        databaseURL: "https://qry-shortener.firebaseio.com",
        projectId: "qry-shortener",
        storageBucket: "qry-shortener.appspot.com",
        messagingSenderId: "941227555300"
    };

    firebase.initializeApp(config);

    let lastLink = "";

    function copyToClipboard(str) {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = str;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = { position: 'absolute', left: '-9999px' };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
    }

    function copyLink() {
        copyToClipboard(lastLink);
    }

    function addFB() {
        let name = document.getElementById('name').value,
            url = document.getElementById('url').value;
        if (!validKey(name)) {
            if (!url.includes('http')) {
                url = 'http://' + url
            }
            if (validURL(url) && !(url.includes('qurl.pro')) && !(url.includes(' '))) {
                document.getElementById('feedback').innerHTML = "&#128336; Creating short link...";
                firebase.database().ref('qry-shortener/' + name).once("value").then(function(snapshot) {
                    if (snapshot.val()) {
                        document.getElementById('feedback').innerHTML = "&#10060; This name is already in use!";
                    } else {
                        firebase.database().ref('qry-shortener/' + name).set({
                            Name: name,
                            URL: url
                        });
                        document.getElementById('feedback').innerHTML = "&#128077; Short link created.";
                        document.getElementById('actions').style.display = "block";
                        lastLink = 'http://qurl.pro/#' + name;
                        document.getElementById('crForm').reset();
                    }
                });
            } else {
                document.getElementById('feedback').innerHTML = "&#10060; Invalid URL!";
            }
        } else {
            document.getElementById('feedback').innerHTML = '&#10060; Link name cannot include ".", "#", "$", "[", or "]"!';
        }
    }

    function AvoidSpace(event) {
        let k = event ? event.which : window.event.keyCode;
        if (k == 32) return false;
    }

    function validURL(str) {
        var a = document.createElement('a');
        a.href = str;
        return (a.host && a.host != window.location.host);
    }

    function validKey(str) {
        bad = ['.', '#', '$', '[', ']']
        return bad.some(substring => str.includes(substring))
    }