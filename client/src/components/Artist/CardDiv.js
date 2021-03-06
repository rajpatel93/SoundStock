import React from "react";
import Progress from "./Progress";
import Music from "./Music";
import Image from "./Image";
import InvestBtn from "./Invest";
import API from "../../utils/API";

const styles = {
  padding: {
    paddingTop: 40,
    marginLeft: 10
  },

  card: {
    marginTop: 50
  },

  invest: {
    paddingLeft: 140,
    paddingTop: 30
  },

  stuff: {
    marginTop: "15px"
  }
};

export class CardDiv extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0
    };
  }

  grabNumberValue = number => {
    if (number < this.props.investP) {
      alert("You must add shares to whats already been invested in this song");
    } else {
      this.setState({
        number: number
      });
      API.updateInvest(this.props.artid, {
        investP: number
      })
        .then(res => {
          console.log(res);
          this.props.loadArtist();
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="card" style={styles.card}>
        <div className="card-header">
          <div className="row">
            <div className="col-md-7">
              <h5>Featured: {this.props.name}</h5>
            </div>
            <div className="col-md-3">
              <Progress number={this.state.number} />
            </div>
            <div className="col-md-2" style={styles.stuff}>
              <InvestBtn
                artist={this.props.name}
                grabNumberValue={this.grabNumberValue}
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-2">
              <Image img={this.props.img} alt={this.props.alt} />
            </div>
            <div className="col-md-5">
              {/* added child to this so that we can assaign the this.props.summary that we get from db */}
              <p>{this.props.goal}</p>
            </div>
            <div className="col-md-5">
              <Music src={this.props.src} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
