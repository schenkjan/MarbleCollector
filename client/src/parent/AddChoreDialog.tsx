import { Button, Dialog, DialogContent, DialogContentText } from "@material-ui/core";

type Prop = {
    open: boolean;
    onCancel: () => void;
    onDelete: () => void;
    onSave: () => void;
};

export function AddChoreDialog(props: Prop) {
    return (
        <Dialog open={props.open}>
            <DialogContent>
                <DialogContentText>
                    Ämtli erstellen...
                </DialogContentText>
            </DialogContent>
            <Button variant="contained" color="primary" onClick={props.onSave}>Speichern</Button>
            <Button variant="contained" color="secondary" onClick={props.onDelete}>Löschen</Button>
            <Button variant="outlined" color="primary" onClick={props.onCancel}>Abbrechen</Button>
        </Dialog>
    );
}