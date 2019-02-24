
var event_ref;

const promises = {
    init: () => {
        return new Promise((resolve, reject) => {
            if (typeof FB !== 'undefined') {
                resolve();
            } else {
                window.fbAsyncInit = () => {
                    FB.init({
                        appId      : '259641108285309',
                        cookie     : true, 
                        xfbml      : true,  
                        version    : 'v2.5'
                    });
                    resolve();
                };
                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        });
    },
    checkLoginState: () => {
        return new Promise((resolve, reject) => {
            FB.getLoginStatus((response) => {
                response.status === 'connected' ? resolve(response) : reject(response);
            });
        });
    },
    login: () => {
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                response.status === 'connected' ? resolve(response) : reject(response);
            });
        });
    },
    logout: () => {
        return new Promise((resolve, reject) => {
            FB.logout((response) => {
                response.authResponse ? resolve(response) : reject(response);
            });
        });
    },
    fetch: () => {
        return new Promise((resolve, reject) => {
            FB.api(
                '/me', 
                {fields: 'first_name, last_name, gender'},
                response => response.error ? reject(response) : resolve(response)
            );
        });
    },
    getAlbums: () => {
        return new Promise((resolve, reject) => {
            FB.api("me?fields=albums.limit(5){name,count,cover_photo{picture}}", "GET", (response) => {
        var photos = response["albums"]["data"];
        var html = "";
        for(var i=0;i<photos.length;i++) {
            var images = photos[i]["cover_photo"]["picture"];
            var id = photos[i]["id"];

            html+= '<img class="cover_photo" src="'+images+'" id="'+ id +'" />';
            
        }

        if(document.getElementById("photos") != null)
            document.getElementById("photos").innerHTML = html;
        });
    });
    },
    getPhotos: (that) => {

        return new Promise((resolve, reject) => {
            //var albumId = event.target.id;
            
            FB.api(event.target.id + '/?fields=photos.limit(5){picture,images}', "GET", (response) => {
        var photos = response["photos"]["data"];
        var html = "";
        for(var i=0;i<photos.length;i++) {
            var images = photos[i]["picture"];
            var id = photos[i]["id"];

            html+= '<img class="cover_photo" src="'+images+'" id="'+ id +'" />';
            
        }
        if(document.getElementById("album_photos") != null)
            document.getElementById("album_photos").innerHTML = html;
        });
    })[that];
    }
}

export const Facebook = {
    doLogin() {
        this.setState({
            loading: true
        }, () => {
            promises.init()
                .then(
                    promises.checkLoginState,
                    error => { throw error; }
                )
                .then(
                    response => { this.setState({status: response.status}); },
                    promises.login
                )
                .then(
                    promises.fetch,
                    error => { throw error; }
                )
                .then(
                    response => { this.setState({loading: false, data: response, status: 'connected'}); },
                    error => { throw error; }
                )
                .then(
                    promises.getAlbum,
                )
                .catch((error) => { 
                    this.setState({loading: false, data: {}, status: 'unknown'});
                    console.warn(error); 
                });
        });
    },
    doLogout() {
        this.setState({
            loading: true
        }, () => {
            promises.init()
                .then(
                    promises.logout,
                    error => { this.setState({data: {}, status: 'unknown'}); }
                )
                .then(
                    response => { this.setState({loading: false, data: {}, status: 'unknown'}); },
                    error => { throw error; }
                )
                .catch(error => { 
                    this.setState({loading: false, data: {}, status: 'unknown'});
                    console.warn(error); 
                });
        });
    },
    checkStatus() {
        this.setState({
            loading: true
        }, () => {
            promises.init()
                .then(
                    promises.checkLoginState,
                    error => { throw error; }
                )
                .then(
                    response => { this.setState({status: response.status}); },
                    error => { throw error; }
                )
                .then(
                    promises.fetch,
                    error => { throw error; }
                )
                .then(
                    promises.getAlbums,
                    error => { throw error; }
                )
                .then(
                    response => { this.setState({loading: false, data: response, status: 'connected'}); },
                    error => { throw error; }
                )
                .catch((error) => { 
                    this.setState({loading: false, data: {}, status: 'unknown'});
                    console.warn(error); 
                });
        });
    },
    getAlbums() {
        
        this.setState({
            loading: true
        }, () => {
            promises.getAlbums()
                .then(
                    response => { this.setState({loading: false, data: {}, status: 'connected'}); },
                    error => { throw error; }
                )
                .catch(error => { 
                    this.setState({loading: false, data: {}, status: 'connected'});
                    console.warn(error); 
                });
        });
    },
    getPhotos(e) {

        this.setState({
            loading: true,
            event:e
        }, () => {
            promises.getPhotos(this)
                .then(
                    response => { this.setState({loading: false, data: {}, status: 'connected'}); },
                    error => { throw error; }
                )
                .catch(error => { 
                    this.setState({loading: false, data: {}, status: 'connected'});
                    console.warn(error); 
                });
        });
    },
    checkStatusPhotos(e) {
        this.setState({
            loading: true,
            event:e
        }, () => {
            promises.init()
                .then(
                    promises.checkLoginState,
                    error => { throw error; }
                )
                .then(
                    response => { this.setState({status: response.status}); },
                    error => { throw error; }
                )
                .then(
                    promises.fetch,
                    error => { throw error; }
                )
                .then(
                    promises.getPhotos(this),
                    error => { throw error; }
                )
                .then(
                    response => { this.setState({loading: false, data: response, status: 'connected'}); },
                    error => { throw error; }
                )
                .catch((error) => { 
                    this.setState({loading: false, data: {}, status: 'unknown'});
                    console.warn(error); 
                });
        });
    }
};