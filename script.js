var users;
var realName;
window.addEventListener('scroll', function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 150) {
        document.getElementById('backToTop').style.opacity = '1';
        document.getElementById('backToTop').style.visibility = 'visible';
    } else {
        document.getElementById('backToTop').style.opacity = '0';
        document.getElementById('backToTop').style.visibility = 'hidden';
    }
});
function openLogin() {
    if (document.getElementById('wrap').style.visibility == 'visible') {
        document.getElementById('wrap').style.visibility = 'hidden';
        document.getElementById('wrap').style.opacity = '0';
    }
    else {
        document.getElementById('wrap').style.visibility = 'visible';
        document.getElementById('wrap').style.opacity = '0.75';
    }
    document.getElementById('login').classList.toggle('open');
}
function openEmail() {
    document.getElementById('email').style.visibility = 'visible';
    document.getElementById('email').style.opacity = '1';
    document.getElementById('login').classList.toggle('open');
}
function closeEmail() {
    document.getElementById('email').style.visibility = 'hidden';
    document.getElementById('email').style.opacity = '0';
    document.getElementById('login').classList.toggle('open');
}
var users = [];

function signin() {
    var names = document.getElementById('name-input').value;
    var emails = document.getElementById('em-input').value;
    var passwords = document.getElementById('pass-input').value;

    var storedData = localStorage.getItem('userDetails');
    users = storedData ? JSON.parse(storedData) : [];

    var newUser = {
        username: names,
        useremail: emails,
        userpassword: passwords
    };

    users.push(newUser);

    localStorage.setItem('userDetails', JSON.stringify(users));

    document.getElementById('name-input').value = '';
    document.getElementById('em-input').value = '';
    document.getElementById('pass-input').value = '';
    document.getElementById('signin').style.visibility = 'hidden';
    document.getElementById('signin').style.opacity = '0';


    document.getElementById('email').style.visibility = 'visible';
    document.getElementById('email').style.opacity = '1';
}
function login() {
    var flag = false;
    var email = document.getElementById("email-input").value;
    var password = document.getElementById("password-input").value;
    var userName = localStorage.getItem("userDetails");
    
    if (userName) {
        var json = JSON.parse(userName);
        for (var i = 0; i < json.length; i++) {
            if (email == json[i].useremail && password == json[i].userpassword) {
                flag = true;
                closeEmail();
                openLogin();
                localStorage.setItem('auth', 'true');
                localStorage.setItem('realName', json[i].username);
                checklogIn = true;
                realName = localStorage.getItem('realName');
                document.getElementById('right').innerHTML = `
                <img src='https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png' class='a'>
                <p>${realName}</p>
                <button title="Sell">
                <img src="https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg"
                alt="Button border">
                <div>
                <img src="https://www.olx.com.pk/assets/iconPlusSell_noinline.75fc7ea23e80b50447cf5757d8ef083a.svg"
                alt="Plus icon">
                <span
                style="margin-left: 10px; font-weight: bolder; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">SELL</span>
                </div>
                </button>
                `
                break;
                
            }
        }
    }

    if (!flag) {
        alert("Account not signed in");
        document.getElementById('email').style.visibility = 'hidden';
        document.getElementById('email').style.opacity = '0';
        document.getElementById('signin').style.visibility = 'visible';
        document.getElementById('signin').style.opacity = '1';
        
    }
}
function checkAuth() {
    if (localStorage.getItem('auth') == "true") {
        realName = localStorage.getItem('realName');
        document.getElementById('right').innerHTML = `
        <img src='https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png' class='a'>
        <p>${realName}</p>
        <button title="Sell" onclick="sell()">
            <img src="https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg"
            alt="Button border">
            <div>
            <img src="https://www.olx.com.pk/assets/iconPlusSell_noinline.75fc7ea23e80b50447cf5757d8ef083a.svg"
            alt="Plus icon">
            <span
            style="margin-left: 10px; font-weight: bolder; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">SELL</span>
            </div>
            </button>
            `;
        }
    }
checkAuth()
function sell() {
    if (localStorage.getItem('auth') === "true") {
        window.location.href = 'sell.html';
    } else {
        if (document.getElementById('wrap').style.visibility === 'visible') {
            document.getElementById('wrap').style.visibility = 'hidden';
            document.getElementById('wrap').style.opacity = '0';
        } else {
            document.getElementById('wrap').style.visibility = 'visible';
            document.getElementById('wrap').style.opacity = '0.75';
        }
        login();
    }
}