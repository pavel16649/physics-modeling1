import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './main.css'

const QGraph = () => {
    const [D, setD] = useState(0.01);
    const [l, setl] = useState(0.01);
    const [L, setL] = useState(0.1);
    const [d , setd] = useState(0.001);
    const [I , setI] = useState(7.5);
    const [layout] = useState({
        width: 800,
        height: 700,
        xaxis: { title: 'Длина l (м)' },
        yaxis: { title: 'Индукция B (Тл)' },
        title: "Зависимость магнитной индукции B от длины катушки l",
    });

    const [newD , setnewD] = useState(0.01);
    const [newl , setnewl] = useState(0.01);
    const [newL , setnewL] = useState(0.1);
    const [newd , setnewd] = useState(0.001);

    const [showModal, setShowModal] = useState(false);
    const [showModalL, setShowModalL] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleShowModalL = () => {
        setShowModalL(true);
    }

    const handleCloseModalL = () => {
        setShowModalL(false);
    }


    const Update = () => {
        let n = Math.sqrt((newL * newL - newl * newl) / Math.PI / Math.pow(newD + newd, 2));
        let flag = false;
        if (n > newl / newd) {
            handleShowModal();
            flag = true;
        } else if (newL < newl){
            handleShowModalL();
            flag = true;
        } else {
            setD(newD);
            setl(newl);
            setL(newL);
            setd(newd);
        }

        if (flag) {
            setnewD(D);
            setnewl(l);
            setnewL(L);
            setnewd(d);
        }
    }


    const mu_0 = 1.25663706212 * Math.pow(10, -6);
    const L_ind = mu_0 / 4 * D * D * (L * L - l * l) / Math.PI / Math.pow(D + d, 2) / l;
    const xValues = Array.from({ length: 1500 }, (_, i) => i / 1000);
    const yValues = xValues.map((x) => {
        const y = mu_0 * I * Math.sqrt(L * L - x * x) / Math.PI / (D + d) / x;
        return y < 0 ? null : y; // Возвращаем null для отрицательных значений
    });


    return (
        <div className='body' style={{ position: 'relative' }}>
            <div>
                <h1>Моделирование 1. Задача 2</h1>
                <div className='txt'>
                    <h2>Условие задачи</h2>
                </div>
                <div className='txt'>
                    <text>
                        Из провода длиной L и диаметром d требуется намотать катушку на цилиндрический каркас диаметром
                        D и длиной l, таким образом, чтобы получить максимальную индукцию магнитного поля на оси катушки
                        в центре. Число витков N должно быть одинаково по всей длине катушки. Определите индуктивность
                        получившейся катушки. Параметры должны задаваться. Построить график зависимости В=f(l)
                    </text>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        Введите диаметр катушки D (м): <input type="number" value={newD} step='any' min='0'
                                                              onChange={(e) => setnewD(parseFloat(e.target.value))}/>
                    </div>
                    <div className='input'>
                        Введите длину катушки l (м): <input type="number" value={newl} step='any' min='0'
                                                            onChange={(e) => setnewl(parseFloat(e.target.value))}/>
                    </div>
                    <div className='input'>
                        Введите длину провода L (м): <input type="number" value={newL} step='any' min='0'
                                                            onChange={(e) => setnewL(parseFloat(e.target.value))}/>
                    </div>
                    <div className='input'>
                        Введите диаметр провода d (м): <input type="number" value={newd} step='any' min='0'
                                                              onChange={(e) => setnewd(parseFloat(e.target.value))}/>
                    </div>
                    <div className='input'>
                        Введите силу тока в катушке I (А): <input type="number" value={I} step='any' min='0'
                                                              onChange={(e) => setI(parseFloat(e.target.value))}/>
                    </div>
                    <div className='input'>
                        <p>
                            Индуктивность катушки {L_ind} Гн
                        </p>
                    </div>
                    <div>
                        <button onClick={Update}>Рассчитать</button>
                    </div>
                </div>
            </div>
            <Plot
                data={[
                    {
                        x: xValues,
                        y: yValues,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: 'blue'},
                        clip: 'onaxis'
                    },
                ]}
                layout={layout}
            />
            {showModal && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Предупреждение</h2>
                        <p>При выбранных значениях проволока целиком не уместится на катушке.</p>
                        <button onClick={handleCloseModal}>Попробую другие</button>
                    </div>
                </div>
            )}
            {showModalL && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Предупреждение</h2>
                        <p>Выбранное значение длины проволоки меньше длины катушки.</p>
                        <button onClick={handleCloseModalL}>Попробую другое</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QGraph;
