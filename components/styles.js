import { makeStyles } from '@material-ui/core/styles';
let appStyles = makeStyles((theme) => ({
    sideMenu: {
        width: 200,
    },
    loader: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    loader_text: {
        marginLeft: theme.spacing(2),
    },
    loginRootBox: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },    
    rootBox: {
        display: 'flex',
        flexDirection: 'column',
        background: '#757575',
        height: '100%'
    },
    contentBody: {
        flexGrow: 1,
        background: '#fff',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    searchResultBox : {
        flexGrow: 1,
    },
    searchBoxContainer: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    searchBoxButton: {
        paddingLeft: '0',
        paddingRight: '0',
    },
    searchData: {
        margin: '0.5rem 0rem;'
    },
    personTextLabel: {
        color: theme.palette.text.primary
    },
    personText: {

    }
}));

export default appStyles;