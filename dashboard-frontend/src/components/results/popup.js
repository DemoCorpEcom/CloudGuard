import Popup from 'reactjs-popup';
import './Popup.css'

const ViewLinks = ({ data }) => {
    return (
        <Popup trigger={<button>View Links</button>} position="right center">
            {
                close => (<div>
                    <div className="popup overflow-scroll">
                        <div className="popup_header ">
                            <h1 className="popup_title">Affected URLs - {data[0].vulnerability}</h1>
                            <h1 className="popupclose_btn" onClick={close}>&times;</h1>
                        </div>
                        <div className="details">
                            {
                                data.map((item) => {
                                    return (
                                        <p><a href={item.affectedUrl}>{item.affectedUrl}</a></p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div >)
            }
        </Popup >
    )
}

export default ViewLinks