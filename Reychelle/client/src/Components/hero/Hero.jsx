//eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./Hero.scss";
import { heroImages } from "../../assets/assets";
import { PiDressLight, PiTShirtLight, PiSneaker } from "react-icons/pi";
import { LiaChildSolid } from "react-icons/lia";
import { GiEmeraldNecklace } from "react-icons/gi";

const Hero = () => {
  const [showImage, setShowImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowImage((showImage) =>
        showImage === heroImages.length - 1 ? 0 : showImage + 1
      );
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  function handleNext() {
    setShowImage(showImage === heroImages.length - 1 ? 0 : showImage + 1);
  }
  function handlePrev() {
    setShowImage(showImage === 0 ? heroImages.length - 1 : showImage - 1);
  }

  return (
    <div>
      <div className="hero-container">
        <div className="nav-container">
          <div className="women">
            <div className="text-icon">
              <PiDressLight />
              <p>Women</p>
            </div>
            <div className="women-links inactive">
              <ul>
                <li>w.item1</li>
                <li>w.item2</li>
                <li>w.item3</li>
                <li>w.item4</li>
                <li>w.item5</li>
                <li>w.item6</li>
                <li>w.item7</li>
                <li>w.item8</li>
                <li>w.item9</li>
              </ul>
            </div>
          </div>

          <div className="men">
            <div className="text-icon">
              <PiTShirtLight />
              <p>Men</p>
            </div>
            <div className="men-links inactive">
              <ul>
                <li>w.item1</li>
                <li>w.item2</li>
                <li>w.item3</li>
                <li>w.item4</li>
                <li>w.item5</li>
              </ul>
            </div>
          </div>

          <div className="kids">
            <div className="text-icon">
              <LiaChildSolid />
              <p>Kids</p>
            </div>
            <div className="kids-links inactive">
              <ul>
                <li>w.item1</li>
                <li>w.item2</li>
                <li>w.item3</li>
                <li>w.item4</li>
                <li>w.item5</li>
              </ul>
            </div>
          </div>

          <div className="accessories">
            <div className="text-icon">
              <GiEmeraldNecklace />
              <p>Accessories</p>
            </div>
            <div className="accessories-links inactive">
              <ul>
                <li>watches</li>
                <li>bags</li>
                <li>jewellries</li>
                <li>belts</li>
                <li>others</li>
              </ul>
            </div>
          </div>

          <div className="foot-wears">
            <div className="text-icon">
              <PiSneaker />
              <p>Foot Wears</p>
            </div>
            <div className="foot-wears-links inactive">
              <ul>
                <li>sneakers</li>
                <li>loafers</li>
                <li>sandals</li>
                <li>somekind shoe like that</li>
                <li>others</li>
                <li>and another one</li>
              </ul>
            </div>
          </div>
        </div>

        {/* image slider */}
        <div className="image-container">
          <div className="arrow a-left" onClick={handlePrev}></div>
          {heroImages && heroImages.length ? (
            heroImages.map((item, index) => {
              return (
                <div
                  key={item._id}
                  className={
                    showImage === index
                      ? "image-wrapper"
                      : "image-wrapper no-show"
                  }
                >
                  <img src={item.image} alt={`hero image No${item._id}`} />
                </div>
              );
            })
          ) : (
            <>no resources found</>
          )}
          <div className="arrow a-right" onClick={handleNext}></div>
		<span className="indicators">
		{
			heroImages && heroImages.length ? 
			heroImages.map((_,index) => {
				return(
					<button key={index} className={showImage === index ? "curr-indicator active" : "curr-indicator"}></button>
				)
			})
			: null
		}</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
