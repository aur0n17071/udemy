import './app-info.css';

const AppInfo = (props) => {
    const [count,rise] = props.infoUpdate;

    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании Company</h1>
            <h2>Общее число сотрудников: {count}</h2>
            <h2>Прамию получат: {rise}</h2>
        </div>
    )
}

export default AppInfo;