import { ReactElement, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from '@mui/material/Link';
import { readRFID, decryptAddress, getStoredData } from "../../../../utils/api";
import Alert from "@mui/material/Alert";

function ReadAndAddData (): ReactElement {
    const [encryptedTangleAddress, setEncryptedTangleAddress] = useState("");
    const [tangleAddress, setTangleAddress] = useState("");
    const [RFID, setRFID] = useState("");
    const [dataStored, setDataStored] = useState("");
    const [handleDecryptAddressLoading, setHandleDecryptAddressLoading] = useState(false);
    const [rfidLoading, setRfidLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDecryptAddress = async () => {
        setHandleDecryptAddressLoading(true);
        try {
            const tangleAddress = await decryptAddress(encryptedTangleAddress, RFID);
            if (tangleAddress) {
                setTangleAddress(tangleAddress);
                const data = await getStoredData(tangleAddress);
                if (data) {
                    setDataStored(data);
                }
            }
        } catch (err) {
            // @ts-ignore
            setError(err);
        }
        setHandleDecryptAddressLoading(false);
    }

    const handleSendRfid = async () => {
        setRfidLoading(true);
        try {
            const res = await readRFID();
            if (res) {
                setRFID(res);
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
            <div className="tab-info" style={{marginBottom: '50px'}}>The QR CODE is decrypted using the RFID UID and the data is retrieved from the tangle using the address. Additional data could be added to the tangle using the created IOTA stream.</div>
            <Grid container spacing={3} style={{marginBottom: '40px'}}>
                <Grid item xs={6} md={4}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Encrypted tangle address"
                        multiline
                        value={encryptedTangleAddress}
                        onChange={(e) => setEncryptedTangleAddress(e.target.value)}
                        rows={3}
                        fullWidth
                        placeholder="Insert text behind QR code by scanner..." />
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
                <Grid item xs={6} md={4}>
                    <LoadingButton
                        variant="contained"
                        style={{position: 'relative', top: '15%'}}
                        onClick={handleDecryptAddress}
                        loading={handleDecryptAddressLoading}>
                        Decrypt address
                    </LoadingButton>
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{marginBottom: '40px'}}>
                <Grid item xs={6} md={4}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Data stored in tangle"
                        multiline
                        value={dataStored}
                        onChange={(e) => setDataStored(e.target.value)}
                        rows={3}
                        fullWidth
                        placeholder="Data..." />
                </Grid>
                <Grid item xs={6} md={4}>
                    <Link href="https://explorer.iota.org/mainnet" target="_blank" style={{position: 'relative', top: '30%'}}>IOTA Explorer</Link>
                </Grid>
            </Grid>
            {/*<Grid container spacing={3} style={{marginBottom: '40px'}}>
                <Grid item xs={6} md={4}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Additional data to be stored in tangle"
                        multiline
                        value={dataStored}
                        onChange={(e) => setDataStored(e.target.value)}
                        rows={3}
                        fullWidth
                        placeholder="Insert data..." />
                </Grid>
                <Grid item xs={6} md={4}>
                    <LoadingButton
                        variant="contained"
                        onClick={handleStoreInTangle}
                        style={{position: 'relative', top: '30%'}}
                        loading={storeInTangleLoading}>
                        Store in tangle
                    </LoadingButton>
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{marginBottom: '40px'}}>
                <Grid item xs={6} md={4}>
                    <TextField
                        id="outlined-basic"
                        label="Tangle address"
                        value={tangleResultAddress}
                        onChange={(e) => setResultTangleAddress(e.target.value)}
                        fullWidth
                        placeholder="Insert data..." />
                </Grid>
                <Grid item xs={6} md={4}>
                    <Link href="https://explorer.iota.org/mainnet" style={{position: 'relative', top: '15%'}}>IOTA Explorer</Link>
                </Grid>
            </Grid>*/}
        </div>
    );
}

export default ReadAndAddData;