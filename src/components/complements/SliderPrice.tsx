import { useState } from "react";
import "./styles.css"

type SliderPriceProps = {
    onChangeRange: (min: number, max: number) => void;
};

const min = 0;
const max = 1000;

function SliderPrice({onChangeRange}: SliderPriceProps ){

    const [priceRange, setPriceRange] = useState({ min, max})


    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const minValue = parseInt(e.target.value);
        setPriceRange((prevRange) => ({          
          min: minValue,
          max: prevRange.max,
        }));
        onChangeRange(minValue, priceRange.max);
    };
      
    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxValue = parseInt(e.target.value);
        setPriceRange((prevRange) => ({
            min: prevRange.min,
            max: maxValue,
        }));
        onChangeRange(priceRange.min, maxValue);
    };

    const calculateProgressWidth = () => {
    const progressWidth = ((priceRange.max - priceRange.min) / (max - min)) * 100;
        return progressWidth;
    };
    
    const calculateLeftOffset = () => {
    const leftOffset = ((priceRange.min - min) / (max - min)) * 100;
        return leftOffset;
    };

    return(
        <>
            <div className="wrapper">
                <header>
                    <h2>Filtrar por precio:</h2>
                </header>
                <div className="price-input">
                    <div className="field">
                        <span>Min</span>
                        <input type="number" className="input-min" value={priceRange.min}/>
                    </div>
                    <div className="separator">-</div>
                    <div className="field">
                        <span>Max</span>
                        <input type="number" className="input-max" value={priceRange.max}/>
                    </div>
                </div>
                <div className="slider">
                    <div className="progress"></div>
                    <div className="progress-range"
                        style={{
                            width: `${calculateProgressWidth()}%`,
                            left: `${calculateLeftOffset()}%`,
                        }}>
                    </div>
                </div>
                <div className="range-input">
                    <input type="range" className="range-min" min={min} max={max} value={priceRange.min} step="100" onChange={handleMinChange}/>
                    <input type="range" className="range-max" min={min} max={max} value={priceRange.max} step="100" onChange={handleMaxChange}/>
                </div>
                        
            </div>            
        </>
    )
}

export default SliderPrice


