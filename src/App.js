import './App.css';
import {useState} from "react";

function splitBySize(string, size) {
    let chunks = [];

    let index = 0;
    while (index < string.length) {
        let end = index + size < string.length ? index + size : string.length;
        chunks.push(string.substring(index, end))
        index += size;
    }

    return chunks;
}

function toHex(integer) {
    if (integer < 0) {
        integer = 0;
    }

    if (integer > 255) {
        integer = 255;
    }

    let string = integer.toString(16);

    if (string.length == 1) {
        return `0${string}`;
    }

    return string;
}

function App() {
    const [color, setColor] = useState('#16A085FF');

    function hexSatUpdate() {
        let hexSat = document.getElementById('hex-sat');
        let hexSatValue = hexSat.value;
        let newValue = hexSatValue;

        if (newValue.length) {
            newValue = newValue.substring(0, 2);
        }

        hexSat.value = newValue;
        setColor(`${color.substring(0,7)}${hexSatValue}`)
        document.getElementById('int-sat').value = parseInt(newValue, 16);
    }

    function intSatUpdate() {
        let intSat = document.getElementById('int-sat');
        let intSatValue = intSat.value;
        let newValue = intSatValue;

        if (parseInt(newValue)) {
            let hexValue = parseInt(newValue).toString(16);
            document.getElementById('hex-sat').value = hexValue;
        }
    }

    function hexUpdate() {
        let hex = document.getElementById('hex');
        let hexValue = hex.value;

        let newValue = hexValue;

        if (!newValue.startsWith('#')) {
            newValue = `#${newValue}`;
            hex.value = newValue;
        }

        if (newValue.length > 7) {
            newValue = newValue.substring(0, 7);
            hex.value = newValue;
        }

        if (newValue.length < 7) {
            return
        }

        let saturation = document.getElementById('hex-sat');
        setColor(`${newValue}${saturation}}`);

        let splitted = splitBySize(newValue.replace('#', ''), 2);
        let r = parseInt(splitted[0], 16);
        let g = parseInt(splitted[1], 16);
        let b = parseInt(splitted[2], 16);

        document.getElementById('R').value = r;
        document.getElementById('G').value = g;
        document.getElementById('B').value = b;

        document.getElementById('int-scale').value = 1;
        document.getElementById('slider-scale').value = 1;
    }

    function rgbUpdate() {
        let r = parseInt(document.getElementById('R').value);
        let g = parseInt(document.getElementById('G').value);
        let b = parseInt(document.getElementById('B').value);

        let hexEquivalent = toHex(r) + toHex(g) + toHex(b);
        let saturation = document.getElementById('hex-sat');

        setColor(`#${hexEquivalent}${saturation}`);
        document.getElementById('int-scale').value = 1;
        document.getElementById('slider-scale').value = 1;
    }

    function sliderUpdate() {
        let slider = document.getElementById('slider-scale');
        let sliderValue = slider.value;

        document.getElementById('int-scale').value = sliderValue;

        let r = parseInt(document.getElementById('R').value);
        let g = parseInt(document.getElementById('G').value);
        let b = parseInt(document.getElementById('B').value);

        let newHex = toHex(parseInt(r * sliderValue)) + toHex(parseInt(g * sliderValue)) + toHex(parseInt(b * sliderValue));
        let saturation = document.getElementById('hex-sat').value;

        document.getElementById('scaled-hex').value = '#' + newHex;
        setColor(`#${newHex}${saturation}`)
    }

    function intScaleUpdate() {
        let scale = document.getElementById('int-scale');
        let value = parseFloat(scale.value);

        if (value < 0) {
            value = 0;
        }

        if (value > 3) {
            value = 3;
        }

        document.getElementById('slider-scale').value = value;

        let r = parseInt(document.getElementById('R').value);
        let g = parseInt(document.getElementById('G').value);
        let b = parseInt(document.getElementById('B').value);

        let newHex = toHex(parseInt(r * value)) + toHex(parseInt(g * value)) + toHex(parseInt(b * value));
        let saturation = document.getElementById('hex-sat').value;

        document.getElementById('scaled-hex').value = '#' + newHex;
        setColor(`#${newHex}${saturation}`)
    }

    return (
        <div className="App">
            <div style={{
                height: '200px',
                width: '800px',
                border: 'solid 1px #DADADA',
                borderRadius: '10px',
                backgroundColor: color
            }}></div>

            <div>
                <label>Hex color: </label>
                <input id={'hex'} onChange={hexUpdate} style={{padding: '5px'}} type={'text'} defaultValue={'#16A085'} />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '10px',
                color: '#f5f5f5',
                alignItems: 'center'
            }}>
                <label>Saturation: </label>
                <input style={{width: '100px', padding: '5px'}} onChange={hexSatUpdate} id={'hex-sat'} type={'text'} defaultValue={'FF'}/>
                <input style={{width: '100px', padding: '5px'}} onChange={intSatUpdate} id={'int-sat'} type={'number'} defaultValue={'255'}/>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '10px',
                color: '#f5f5f5',
                alignItems: 'center'
            }}>
                <label>RBG color: </label>
                <input id={'R'} onChange={rgbUpdate} style={{width: '100px', padding: '5px'}} defaultValue={'22'} type={"number"} min={0} max={255} />
                <input id={'G'} onChange={rgbUpdate} style={{width: '100px', padding: '5px'}} defaultValue={'160'} type={"number"} min={0} max={255} />
                <input id={'B'} onChange={rgbUpdate} style={{width: '100px', padding: '5px'}} defaultValue={'133'} type={"number"} min={0} max={255} />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '10px',
                color: '#f5f5f5',
                alignItems: 'center'
            }}>
                <label>Scale:</label>
                <input id={'slider-scale'} onChange={sliderUpdate} step={'0.1'} defaultValue={1} type={'range'} min={0} max={3} />
                <input id={'int-scale'} onChange={intScaleUpdate} defaultValue={1} step={'0.1'} type={'number'} style={{width: '100px', padding: '5px'}} min={0} max={30} />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '10px',
                color: '#f5f5f5',
                alignItems: 'center'
            }}>
                <label>Scaled hex:</label>
                <input id={'scaled-hex'} defaultValue={'#16A085'} style={{padding: '5px'}} readOnly={true} type={'text'} />
            </div>
        </div>
    );
}

export default App;
