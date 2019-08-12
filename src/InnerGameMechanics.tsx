import React from 'react';


class InnerGameMechanics {
    private PlayerList: Playerlisttype;
    private Day: number;
    private ActionsTaken: Array<string>;

    constructor(PlayerList: Playerlisttype, Day: number) {
        this.PlayerList = PlayerList;
        this.Day = Day;
        this.ActionsTaken = [];
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

    Vore2(Attacker: PlayerType, Victim: PlayerType) {
        let attackerChance = Attacker.Aggressiveness + Attacker.KinkyNess;
        let victimChance = (Victim.Health + Victim.Fullness) + (2 * Math.random());
        if (attackerChance > victimChance) {
            if (Victim.Health > 0.5) {
                this.ActionsTaken.push(Attacker.Name + " swallowed " + Victim.Name + " whole! " + Victim.Name + " struggles against it, but in the end were digested.");
                Attacker.Health += (.5 * Victim.Health);
                Attacker.Fullness += ((.5 * Victim.Fullness) + 0.2);
                this.PlayerList.splice(this.PlayerList.indexOf(Victim), 1);
            } else {
                this.ActionsTaken.push(Attacker.Name + " swallowed " + Victim.Name + " whole! " + Victim.Name + " struggles against it, and breaks out! Defeating " + Attacker.Name + " in the process!");
                Victim.Health -= Math.random() * 0.5;
                this.PlayerList.splice(this.PlayerList.indexOf(Attacker), 1);
            }
        } else {
            this.ActionsTaken.push(Attacker.Name + " attempted to swallow " + Victim.Name + " whole! But they were unable to get them down their throat! In retaliation, " + Victim.Name + " attacked back!");
            this.DirectAttack()
        }
    }

    Vore() {

    }

    DirectAttack() {

    }

    GenerateAlliences() {
        let ListOfIndexes: number[] = [...Array.from(Array(this.PlayerList.length - 1).keys())];
        ListOfIndexes = GenericUtilityFunctions.shuffleArray(ListOfIndexes);
        let Pairs = GenericUtilityFunctions.SplitArray(ListOfIndexes);
        for (const value of Pairs) {
            if (value.length === 2) {
                let Player1 = this.PlayerList[value[0]];
                let Player2 = this.PlayerList[value[1]];

                this.FormedAlliance(Player1, Player2);
            }
        }
    }

    FormAlliance() {
        for (let person of this.PlayerList) {
            let randNum = Math.floor(Math.random() * this.PlayerList.length * 3);
            if (randNum < this.PlayerList.length && this.PlayerList.indexOf(person) != randNum && person.Allies.indexOf(this.PlayerList[randNum]) < 0) {
                let Player1 = person;
                let Player2 = this.PlayerList[randNum];

                this.FormedAlliance(Player1, Player2);
            }
        }
    }

    FormedAlliance2(Player1: PlayerType, Player2: PlayerType) {
        this.ActionsTaken.push(Player1.Name + " Formed alliance with " + Player2.Name);
        Player1.Allies.push(Player2);
        for (let Player1Ally of Player1.Allies) {
            if (Player2.Allies.indexOf(Player1Ally) < 0) {
                Player2.Allies.push(Player1Ally);
            }
        }
        Player2.Allies.push(Player1);
        for (let Player2Ally of Player2.Allies) {
            if (Player1.Allies.indexOf(Player2Ally) < 0) {
                Player1.Allies.push(Player2Ally);
            }
        }
    }

    FormedAlliance(Player1: PlayerType, Player2: PlayerType) {
        this.ActionsTaken.push(Player1.Name + " Formed alliance with " + Player2.Name);
        Player1.Allies.push(Player2);
        Player2.Allies.push(Player1);
    }

    RunRound() {
        //initial Day Actions
        if (this.Day === -1) {
            this.GenerateAlliences()
        }
        const ListOfTwoNeededCanates = [this.AttackOrEncounter, this.Vore, this.Raid]
    }

}

class GenericUtilityFunctions {
    static shuffleArray(array: number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    static SplitArray(inputArray: number[]) {
        let perChunk = 2; // items per chunk

        let result = inputArray.reduce(ReduceFunct, []);

        function ReduceFunct(resultArray: number[][], item: number, index: number) {
            const chunkIndex = Math.floor(index / perChunk);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item);

            return resultArray
        }

        return result;
    }
}

export default InnerGameMechanics;
