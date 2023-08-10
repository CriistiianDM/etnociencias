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
    if (callback)
    callback(setData);
  }, [callback]);

  //component
  return (
    <>
        <section className="_dropdown">
            <div onClick={handleActive} data-ref="title">
                <h1> {title_}</h1>
                <a>+</a>
            </div>
            { active && (<div date-ref="content">
             {
                data.map((item, index) => (
                    <div key={index} className="_dropdown_item">
                        <a>
                            <strong>{item.title}</strong>
                            <span>{item.dec}</span>
                        </a>
                    </div>
                ))
             }
            </div>)
          }
        </section>
    </>
  );


};


export default Dropdown;