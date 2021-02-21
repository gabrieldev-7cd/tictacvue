window.onload = () => {
    var apps = new Vue({
        el: '#msg',
        data: {
          mssg: 'Hello Vue!'
        }
      })


    const app = new Vue({
        el: '#app',
        data: {
        socket: null,
        game: null,
        myturn: null,
        symbol: null,
        playerName: null,
        message: "",
        blockRegister: null,
        },
        methods:{
            startGame(){
                this.message = "Waiting Enemy"
                this.blockRegister = true
                this.socket.emit("game.begin",{
                    playerName: this.playerName,
                });
            },
            renderTurnMessage(){
                this.message =  this.myTurn ? "sua vez" : "Aguarde, vez do adversário";
            }
        },
        mounted() {
            this.socket = io.connect(window.location.origin);

            const self = this;

            this.socket.on("game.begin", function(data){
                this.game = data;
                const myPlayer =(
                data._player1._socketId = self.socket.id 
                ? data._player1
                : data._player2);

                self.symbol = myPlayer._symbol;
                self.myTurn = data._turnOf == self.symbol;
                self.renderTurnMessage();
            }); 
        }
    });
}