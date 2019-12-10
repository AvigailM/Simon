import React from 'react';
import DialogInput from 'react-native-dialog-input';


export default ModalSaveScore = ({isDialogVisible,sendInput,showDialog}) => {
    return (
        <DialogInput isDialogVisible={isDialogVisible}
            title={"Save Name"}
            message={"Add Your Name(short)"}
            hintInput={""}
            submitInput={(inputText) => { sendInput(inputText) }}
            closeDialog={() => { showDialog(false) }}>
        </DialogInput>
    );
}


