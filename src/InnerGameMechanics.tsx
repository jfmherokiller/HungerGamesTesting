import React from 'react';


class InnerGameMechanics {
    private PlayerList:Playerlisttype;
    private Day:number;
    private ActionsTaken:Array<string>;
    constructor(PlayerList: Playerlisttype, Day: number) {
        this.PlayerList = PlayerList;
        this.Day = Day;
        this.ActionsTaken=[];
    }

    Exploration() {

    }
    AttackOrEncounter() {

    }
    Stealth() {

    }
    Forage() {

    }
    SanityCheck() {

    }
    Raid() {

    }
    Vore() {

    }
    DirectAttack() {

    }

    RunRound() {

    }

}

export default InnerGameMechanics;
