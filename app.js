new Vue({
    el:"#app",
    data:{
        player_health:100,
        monster_health:100,
        game_is_on:false,
        logs:[],
        attack_multiple:10,
        special_attack_multiple:25,
        heal_up_multiple:20,
        monster_attack_multiple:15,
        log_text:{
            attack:"Player Attack",
            special_attack:"Special Attack",
            monster_attack:"Monster Attack",
            heal_up:"Heal Up",
            give_up:"Give Up!!!"
        }
    },
    methods:{
        start_game:function(){
            this.game_is_on=true;
        },
        attack:function(){
            var point = Math.ceil(Math.random()*this.attack_multiple);
            this.monster_health-=point;
            this.monster_attack();
            this.add_to_log({turn:"p",text:this.log_text.attack + ":" + point})

        },
        special_attack:function(){
            var point = Math.ceil(Math.random()*this.special_attack_multiple);
            this.monster_health-=point;
            this.add_to_log({turn:"p",text: this.log_text.special_attack+":"+ point})
            this.monster_attack()
        },
        heal_up:function(){
            var point = Math.ceil(Math.random()*this.heal_up_multiple);
            this.player_health+=point;
            this.add_to_log({turn:"p",text:this.log_text.heal_up+":" +point})
            this.monster_attack()
        },
        give_up:function(){
            this.player_health=0;
            this.add_to_log({turn:"p", text:this.log_text.give_up})
        },
        monster_attack:function(){
            var point = Math.ceil(Math.random()*this.monster_attack_multiple);
            this.player_health-=point;
            this.add_to_log({turn:"m",text: this.log_text.monster_attack+":"+point})
        },
        add_to_log:function(log){
            this.logs.push(log)
        }

    },
    watch:{
        player_health:function(value){
            if(value<=0){
                this.player_health=0;
               if( confirm("You lost the game. Do you want to continue?")){
                   this.player_health=100;
                   this.monster_health=100;
                   this.logs=[];

               }
            }
            else if(value>=100){
                this.player_health=100;
            }
        },
        monster_health:function(value){
            if(value<=0){
                this.monster_health=0;
                if( confirm("You won the game. Do you want to continue?")){
                    this.player_health=100;
                    this.monster_health=100;
                    this.logs=[];
                }
            }
        
        }
    },
    computed:{
        player_progress:function(){
            return {
                width:this.player_health +'%'
            }
        },
        monster_progress:function(){
            return {
                width:this.monster_health +'%'
        }
        },
    }
})