import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import InnerGameMechanics from "./InnerGameMechanics"
class PlayButton extends React.Component<{ PlayerCallback: Function },{}> {
    constructor(props: Readonly<{ PlayerCallback: Function; }>) {
        super(props);
    }
    render() {
        return (
            <button className="PlayRound" onClick={() => this.props.PlayerCallback()}> Play Round</button>
        );
    }
}

class OutputFeild extends React.Component {
    render() {
        return (
            <textarea className="OutputFeild"/>
        );
    }
}


class Player extends React.Component {
    render() {

        const {Imageurl, Name, Health, MaxHealth, Fullness, KinkyNess, Aggressiveness, Allies, Statuses, MaxFullness,Tools} = this.props as any;
        return (
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={`${Imageurl}%`}/>
                <Card.Body>
                    <Card.Title>{Name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Health:<ProgressBar now={Health} max={MaxHealth}
                                                            label={`${Health}%`}/></ListGroup.Item>
                        <ListGroup.Item>Fullness:<ProgressBar now={Fullness} max={MaxFullness} label={`${Fullness}%`}/></ListGroup.Item>
                        <ListGroup.Item>Kinkyness: {KinkyNess}</ListGroup.Item>
                        <ListGroup.Item>{Player.GenerateList("Allies", Allies)}</ListGroup.Item>
                        <ListGroup.Item>{Player.GenerateList("Statuses", Statuses)}</ListGroup.Item>
                        <ListGroup.Item>{Player.GenerateList("Tools", Tools)}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }

    static GenerateList(ListName: string, Data: Array<string>) {
        return <Card.Text>{ListName}: {Data.join(", ")}</Card.Text>
    }
}



class Game extends React.Component<{}, { PlayerList: Playerlisttype, Day:number,TextboxInfo:string}> {
    public Playerlist: Playerlisttype = [{
        Imageurl: "https://i.imgur.com/Tc3nzoW.png",
        Name: "ASS",
        Health: 100,
        MaxHealth: 100,
        Fullness: 100,
        MaxFullness: 100,
        KinkyNess: 100,
        Aggressiveness: 100,
        Allies: ["John", "Michel", "Smith"],
        Statuses: ["Pooltoy"],
        Tools:["aaa"]
    }];

    constructor(props: any) {
        super(props);
        this.state = {PlayerList: [],Day:-1,TextboxInfo:""};
    }

    render() {
        return ([<label>Day:{this.state.Day}</label>,this.renderPlayerBits(),                <PlayButton PlayerCallback={this.AdvanceDay.bind(this)}/>,
            <textarea className="OutputFeild" value={this.state.TextboxInfo}/>])

    }

    static renderPlayer(ImageUrl: string, Name: string, Health: number, Fullness: number, KinkyNess: number, Aggressiveness: number, Allies: any, Statuses: any, Tools:any) {
        // @ts-ignore
        return <div className="Myrow"><Player Imageurl={ImageUrl} Name={Name} Health={Health} Fullness={Fullness} KinkyNess={KinkyNess}
                                            Aggressiveness={Aggressiveness} Allies={Allies} Statuses={Statuses} Tools={Tools}/></div>;
    }

    renderPlayerBits() {
        let output: any[] = this.state.PlayerList.map((value: PlayerType) => {
            return Game.renderPlayer(value.Imageurl, value.Name, value.Health, value.Fullness, value.KinkyNess, value.Aggressiveness, value.Allies, value.Statuses, value.Tools);
        });
        let PlayerAdder = <AddPlayer PlayerCallback={this.AcceptNewPlayer.bind(this)}/>;

        let final = [<div className="Myrows">{output}</div>];
        if(this.state.Day === -1) {
            final.push(PlayerAdder)
        }
        return final;
    }

    AcceptNewPlayer(PlayerObject: PlayerType) {
        let oldList: Playerlisttype = this.state.PlayerList;
        oldList.push(PlayerObject);
        this.setState({PlayerList: oldList})
    }
    AdvanceDay() {
        this.setState({Day: this.state.Day +1});
        let AdvancedMechanic = new InnerGameMechanics(this.state.PlayerList,this.state.Day);
        let Output = AdvancedMechanic.RunRound();
    }
}

class AddPlayer extends React.Component<{ PlayerCallback: Function }, { PlayerImage: string, PlayerName: string }> {


    constructor(props: Readonly<{ PlayerCallback: Function; }>) {
        super(props);
        this.state = {PlayerImage: '', PlayerName: ''};

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: { target: any; }) {
        const target = event.target;
        const value: string = target.value;
        const name: string = target.className;
        if (name === "PlayerImage") {
            this.setState({
                ["PlayerImage"]: value
            });
        } else if (name === "PlayerName") {
            this.setState({
                ["PlayerName"]: value
            });
        }

    }

    render() {

        return (
            <div className="PlayerData">
                <label>Image Url</label><textarea className="PlayerImage" value={
                // @ts-ignore
                this.state.Url
            } onChange={this.handleInputChange}/>
                <br/>
                <label>Name:</label><textarea className="PlayerName" value={
                // @ts-ignore
                this.state.Name
            } onChange={this.handleInputChange}/>
                <br/>
                <button onClick={() => this.ButtonOnClick()}>Add Player</button>
            </div>
        );
    }

    ButtonOnClick() {
        // @ts-ignore
        let NewPlayer: PlayerType = {
            Imageurl: this.state.PlayerImage,
            Name: this.state.PlayerName,
            Health: 100,
            MaxHealth: 100,
            Fullness: 0,
            MaxFullness: 100,
            KinkyNess: 0,
            Aggressiveness: 0,
            Allies: [],
            Statuses: [],
            Tools:[]
        };
        this.props.PlayerCallback(NewPlayer);
    }
}

const App: React.FC = () => {
    return (
        <div className="App">

                <Game/>

        </div>
    );
};

export default App;
