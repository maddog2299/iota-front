import { ReactElement, useState } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { QRCode } from 'react-qr-svg';
import Alert from '@mui/material/Alert';
import { readRFID, sendDataToTangle } from "../../../../utils/api";
function CreateLabel (): ReactElement {
    const [dataToBeStored, setDataToBeStored] = useState("");
    const [tangleAddress, setTangleAddress] = useState("");
    const [RFID, setRFID] = useState("");
    const [tangleAddressLoading, setTangleAddressLoading] = useState(false);
    const [rfidLoading, setRfidLoading] = useState(false);
    const [qrCodeLink, setQrCodeLink] = useState('');
    const [error, setError] = useState('');

    const handleSendDataToTangle = async () => {
        setTangleAddressLoading(true);
        try {
            const res = await sendDataToTangle(dataToBeStored);
            if (res) {
                setTangleAddress(res);
            }
        } catch (err) {
            // @ts-ignore
            setError(err);
        }
        setTangleAddressLoading(false);
    }

    const handleSendRfid = async () => {
        setRfidLoading(true);
        try {
            const res = await readRFID();
            if (res) {
                setRFID(res);
                setQrCodeLink(res)
            }
        } catch (err) {
            // @ts-ignore
            setError(err);
        }
        setRfidLoading(false);
    }
    return (
        <div className="tab-wrapper">
            {error && (
                <Alert severity="error" color="error">
                    {`Error - ${error}`};
                </Alert>
            )}
            <div className="tab-info" style={{marginBottom: '50px'}}>The data is stored in the IOTA tangle and a QR CODE with the encrypted is generated using the RFID UID as the key</div>
            <Grid container spacing={3} style={{marginBottom: '40px'}}>
                <Grid item xs={6} md={4}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Data to be stored in the tangle"
                        multiline
                        value={dataToBeStored}
                        onChange={(e) => setDataToBeStored(e.target.value)}
                        rows={3}
                        fullWidth
                        placeholder="Insert data..." />
                </Grid>
                <Grid item xs={6} md={4}>
                    <LoadingButton
                        variant="contained"
                        style={{position: 'relative', top: '30%'}}
                        onClick={handleSendDataToTangle}
                        loading={tangleAddressLoading}>
                        Store in tangle
                    </LoadingButton>
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{marginBottom: '40px'}}>
                <Grid item xs={6} md={4}>
                    <TextField
                        id="outlined-basic"
                        label="Tangle address"
                        value={tangleAddress}
                        onChange={(e) => setTangleAddress(e.target.value)}
                        fullWidth
                        placeholder="Insert data..." />
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{marginBottom: '40px'}}>
                <Grid item xs={6} md={4}>
                    <TextField
                        id="outlined-multiline-static"
                        label="RFID UID"
                        value={RFID}
                        onChange={(e) => setRFID(e.target.value)}
                        fullWidth
                        placeholder="12345..." />
                </Grid>
                <Grid item xs={6} md={4}>
                    <LoadingButton
                        variant="contained"
                        onClick={handleSendRfid}
                        style={{position: 'relative', top: '15%'}}
                        loading={rfidLoading}>
                        Read RFID
                    </LoadingButton>
                </Grid>
            </Grid>
            {qrCodeLink && (
                <div className="qr-code-wrapper">
                    <div style={{marginBottom: '30px'}}>Generated QR Code: </div>
                    <div className="qrcode-square" style={{width: '200px', height: '200px'}}>
                        <QRCode bgColor="#FFFFFF" fgColor="#000000" level="L" value={qrCodeLink} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateLabel;