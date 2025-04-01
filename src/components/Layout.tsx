import { Navbar } from "components/ui/components";
import Wrapper from "components/Wrapper";
import Footer from "components/Footer";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Wrapper>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                {children}
                <Footer />
            </div>  
        </Wrapper>
    );
};

export default Layout;
