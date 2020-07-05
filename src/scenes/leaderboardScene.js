import 'phaser';
import Helper from '../helper';
import leaderBoardHtml from '../assets/html/leaderboard.html';
import leaderBoardTitleImg from '../assets/img/leaderboard_title.png';
import restartImg from '../assets/img/restart.png';
import ApiStorage from '../storage';

class LeaderboardScene extends Phaser.Scene {
  constructor(config) {
    super({key: 'LeaderboardScene'});
  }

  preload() {
    this.load.image('leaderboardTitle', leaderBoardTitleImg);
    this.load.image('restart', restartImg);
  }

  create() {
    const height = this.game.scale.height;
    const width = this.game.scale.width;
    const scene = this;
    this.background = Helper.getBaseBackground(this);
    this.background.renderBackground();
    
    const gameOverTitle = this.add.image(width / 2, 100, 'leaderboardTitle');
    const leaderBoard = this.add.dom(width / 2, 350).createFromHTML(leaderBoardHtml);
    const lbUl = document.querySelector('#leaderboard');

    ApiStorage.fetchScores().then((json) => {
      const scores = json.result;
      for (let i = 0; i < scores.length ; i +=1) {
        const newLi = document.createElement('li');
        const usernameSpan = document.createElement('span');
        const scoreSpan = document.createElement('span');
        usernameSpan.textContent = scores[i].user;
        scoreSpan.textContent = scores[i].score;
        newLi.appendChild(usernameSpan);
        newLi.appendChild(scoreSpan);
        lbUl.appendChild(newLi);
      }
    });

    const restartBtn = Helper.createBtn(this, width / 2, 580, 'restart', () => {
      this.scene.start('MainScene');
      this.scene.stop();
    });
    restartBtn.setScale(0.4);
  }

  update() {
    this.background.updateBackground();
  }
}

export default LeaderboardScene;