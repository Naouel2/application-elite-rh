const Modal = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4>Confirmer l'inscription</h4>
                </div>
                <div className="modal-body">
                    <p>Voulez-vous confirmer votre inscription à cette formation?</p>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose}>Annuler</button>
                    <button onClick={onConfirm}>Confirmer</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
