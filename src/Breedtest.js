import React, { Component } from "react";
import html2canvas from "html2canvas";

class Breeder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dad: this.props.dad ? this.props.dad : "1",
      mom: this.props.mom ? this.props.mom : "1",
      gender: this.getGender(),
      attributes: this.getAttributes(this.props.dad, this.props.mom),
    };

    this.printRef = React.createRef();
  }

  render() {
    const handleDownloadImage = async () => {
      const element = this.printRef.current;
      console.log("Element is: ", element);
      const canvas = await html2canvas(element);
      console.log("Canvas is: ", element);
      const data = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");

      console.log("1 Data: ", data);

      if (typeof link.download === "string") {
        console.log("Link: ", link);
        link.href = data;
        link.download = "image.jpg";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.log("Data: ", data);
        window.open(data);
      }
    };
    function getGender() {
      const value = this.getRandomIntInclusive(1, 10);
      if (value < 6) return "m";
      else return "f";
    }

    const renderAttributes = this.state.attributes.map((attribute, i) => {
      if (attribute[1] != "*" && attribute[1].toLowerCase() != "none")
        return (
          <img
            src={`./images/traits/${attribute[2]}/${
              attribute[0]
            }/${attribute[1].replace(" ", "-")}.png`}
            key={i}
            style={{
              position: "absolute",
              zIndex: 1 * i,
              top: "0px",
              width: "200px",
              height: "215px",
              border: "solid thin black",
            }}
          ></img>
          //   <div
          //     key={i}
          //     style={{
          //       position: "absolute",
          //       zIndex: 1 * i,
          //       top: "0px",
          //       width: "200px",
          //       height: "215px",
          //       border: "solid thin black",
          //       backgroundImage: `url("./images/traits/${attribute[2]}/${
          //         attribute[0]
          //       }/${attribute[1].replace(" ", "-")}.png")`,
          //       backgroundPosition: "center center",
          //       backgroundRepeat: "no-repeat",
          //       backgroundSize: "contain",
          //     }}
          //   ></div>
        );
    });

    const t = {
      type: "contactForm",
      name: "Contact Form",
      _elType: "ELEMENT",
      component_path: "contactForm",
      fields: {
        name: {
          _enabled: false,
          label: "Name",
          attr: { placeholder: "Enter your name" },
        },
        email: {
          _enabled: true,
          label: "Email",
          attr: { placeholder: "Enter your email" },
        },
        phone: {
          _enabled: false,
          label: "Phone",
          attr: { placeholder: "Enter your phone number" },
        },
        message: {
          _enabled: true,
          label: "Message",
          attr: { rows: 4, placeholder: "Write your message..." },
        },
        subject: {
          _enabled: true,
          label: "Subject",
          attr: { placeholder: "Email Subject" },
        },
        button: {
          _enabled: true,
          text: "Submit",
          waitingText: "Please wait...",
        },
      },
      form: {
        gap: "15px",
        successMessage: "Thank you for your email :-)",
        labelStyle: {
          color: "#171A21",
          fontSize: "16px",
          padding: [["bottom", "10px"]],
        },
        fieldStyle: {
          color: "#171A21",
          fontSize: "14px",
          minHeight: "50px",
          padding: [
            ["left", "15px"],
            ["right", "15px"],
            ["top", "10px"],
            ["bottom", "10px"],
          ],
          _border: "2px solid #26C281",
          borderRadius: "5px 5px 5px 5px",
          backgroundColor: "#FFFFFF",
        },
        buttonStyle: {
          color: "#FFFFFF",
          height: "50px",
          fontSize: "18px",
          padding: [
            ["left", "30px"],
            ["right", "30px"],
          ],
          _border: "0px solid ",
          borderRadius: "5px 5px 5px 5px",
          backgroundColor: "#26C281",
        },
        successAction: "forward",
        forwardTo: "",
      },
      id: "avgtwo2v",
      settings: { hrefType: "page" },
      attr: { __data: ["", ""] },
    };

    return (
      <div className="col">
        <button className="btn-primary rounded" onClick={handleDownloadImage}>
          Export As PNG
        </button>
        <div className="">{this.state.gender === "m" ? "male" : "female"}</div>
        <div className="">
          {this.state.attributes.map((txt, i) => (
            <p key={i}>
              {txt[0]} {txt[1]} {txt[2]}
            </p>
          ))}
        </div>
        <div className="" style={{ position: "relative" }} ref={this.printRef}>
          {renderAttributes}
        </div>
      </div>
    );
  }
  //   getRandomIntInclusive(min, max) {
  //     min = Math.ceil(min);
  //     max = Math.floor(max);
  //     return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  //   }

  /**
   * Generate a random number between 1 - 100.
   *  1 - 47 = dad's trait
   * 48 - 95 = mom's trait
   * 96 -100 = *  means select a new trait (mutation)
   *
   */
}
export default Breeder;

// var attributes = [];
// var randNum = 0;

// //Cycle through attributes and store
// for (var pos = 0; pos < 7; pos++) {
//   randNum = this.getRandomIntInclusive(1, 100);
//   if (randNum < 48) {
//     attributes.push([
//       dad["attributes"][pos]["trait_type"],
//       dad["attributes"][pos]["value"],
//       "m",
//     ]);
//   } else if (randNum < 95) {
//     attributes.push([
//       mom["attributes"][pos]["trait_type"],
//       mom["attributes"][pos]["value"],
//       "f",
//     ]);
//   } else {
//     //look up all artwork assets and set a new one
//     attributes.push([mom["attributes"][pos]["trait_type"], "*", "*"]);
//   }
// }
