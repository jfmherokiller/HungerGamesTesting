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
    FormedAlliance(Player1:PlayerType,Player2:PlayerType) {
        this.ActionsTaken.push(Player1.Name + " Formed alliance with " + Player2.Name);
        Player1.Allies.push(Player2.Name);
        Player2.Allies.push(Player1.Name);
    }

    RunRound() {
        const ListOfTwoNeededCanates = [this.AttackOrEncounter,this.Vore,this.Raid,this.FormedAlliance]
    }

}

export default InnerGameMechanics;
