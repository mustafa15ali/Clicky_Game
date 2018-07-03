import React, { Component } from 'react';
import './App.css';
import gots from './gots.json'
import Wrapper from './components/Wrapper'
import Nav from './components/Nav'
import Title from './components/Title'
import Card from "./components/Card";



class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        gots: gots,
        unselectedgots: gots
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectGot = character => {
        const findGot = this.state.unselectedgots.find(item => item.character === character);

        if(findGot === undefined) {
            // failure to select a new Got
            this.setState({ 
                message: "You have LOST the Game of Thrones!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                gots: gots,
                unselectedgots: gots
            });
        }
        else {
            // success to select a new Got
            const newgots = this.state.unselectedgots.filter(item => item.character !== character);
            
            this.setState({ 
                message: "You have WON the Game of Thrones!",
                curScore: this.state.curScore + 1,
                gots: gots,
                unselectedgots: newgots
            });
        }

        this.shuffleArray(gots);
    };

    render() {
        return (
            <Wrapper>
                <Nav
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.gots.map(got => (
                        <Card
                            character={got.character}
                            image={got.image}
                            selectGot={this.selectGot} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;
