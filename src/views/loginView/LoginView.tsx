import LoginFrom from "./LoginForm"
import ImageLightDark from "../../components/ui/ImageLightDark"
import loginImgLight from './assets/loginImgLight.svg'
import loginImgDark from './assets/loginImgDark.svg'
const LoginView = () => {
    return (
        <div className='bg-light dark:bg-dark dark:text-light h-full'>
            <div className='flex flex-col j items-center gap-5 pt-14'>
                <h1>Login</h1>
                <LoginFrom />
                <ImageLightDark 
                className="absolute bottom-[15%] max-w-[250px]"
                 srcDark={loginImgDark}
                 srcLight={loginImgLight}
                 />
            </div>
        </div>
      )
}

export default LoginView