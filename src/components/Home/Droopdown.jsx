import React from "react";
import verficateString from "../../utils/_";

//Yo y mis ganas de hacer magia
const Dropdown = ({
    title,
    callback,
}) => {

  const [title_, setTitle] = React.useState("default");
  const [data, setData] = React.useState([{title: 'default', dec:"default"}]);
  const [active, setActive] = React.useState(false);

  const handleActive = () => {
    console.log('active')
    setActive(!active);
  }

  React.useEffect(() => {
    if (verficateString(title)) {
      setTitle(title);
    }  
  }, [title]);

  React.useEffect(() => {
    if (callback) {
      callback(setData);
    }
  }, [callback]);

  React.useEffect(() => {
    console.log(data)
  }, [data]);

  //component
  return (
    <>
        <section className="_dropdown">
            <div onClick={handleActive} data-ref="title">
                <h1> {title_}</h1>
                <a>+</a>
            </div>
            { active && <div data-ref="content">
             {
                data.map((item, index) => (
                    <div key={index}>
                      {
                        Object.entries(item).map(([key, value], index) => 
                        (<a key={index}>
                            <strong>{key}:</strong>
                            <span>{value}</span>
                        </a>))
                      }
                    </div>
                ))
             }
            </div>
          }
        </section>
    </>
  );


};


export default Dropdown;