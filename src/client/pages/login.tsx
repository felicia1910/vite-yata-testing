
import ReturnButton from "../components/common/ReturnButton";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const router = useNavigate();
  return (
    <>
      <div className='mt-20'>
        <div className="w-full flex justify-center h-40">閹割版本，原登陸轉去Outh2.0畫面，這邊不做。</div>
        <ReturnButton btnName='返回' goBack={true} />
      </div>
    </>
  );
};

export default Login;
