import express , { Request, Response , NextFunction} from 'express';
import dotenv from 'dotenv';


dotenv.config();
export const app = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT,10) : 3000;
// cho phep server doc hieu du lieu dang json do client gui len toi da 10mb
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ extended:true}));
//  cau hinh cors de khong bi trinh duyet chan request
app.use((req: Request, res:Response, next:NextFunction) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');


    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();    

});


//api health check kiem tra server dang song hay chet
app.get('/api/health',(_req:Request,res:Response) =>{
    res.status(200).json({
        status:'ok',
        message:'may chu tin tuc dang hoat dong on dinh',
        timestamp: new Date().toISOString(),
        port:PORT,
    });
});

// khoi dong server lang nghe tren cong da dinh
app.listen(PORT,'0.0.0.0',()=>{
    console.log(`[tin tuc server] dang chay tren: http://localhost:${PORT}`);
    console.log(`[tin tuc server] kiem tra api health tai: http://localhost:${PORT}/api/health`);
});

export default app;



