import { Title, rem, MantineProvider, Box } from '@mantine/core';
import { useTheme } from "../../GloabalThemeProvider";
import UserNavBar from "../General/UserNavBar";

function UserFAQPage() {
    const { isDarkMode } = useTheme();
    
    const titleStyle = {
        marginTop: rem(-75),
        textAlign: 'center',
    }

    const textStyle = {
        marginBottom: '20px',
    }

    const lineStyle = {
        width: '80%',             // Adjust the width as needed, e.g., '50%' of the container width
        margin: '0 auto',         // Center the horizontal line horizontally
        border: '1px solid #ccc', // Add a border to the line
      };

      const listStyle = {
        listStyle: 'none', // Remove default bullets
      };

      const containerStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 100% of the viewport height
      };

  return (
    <MantineProvider theme={{ colorScheme: isDarkMode ? 'dark' : 'light' }} withGlobalStyles withNormalizeCSS>
    <div>
        <UserNavBar />
        <h2 style={titleStyle}>FAQ Page</h2>
        <hr style={lineStyle}/>

        <Box maw={800} mx="auto">
          <ul style={listStyle}>
              <li style={textStyle}>
              <strong>What is AniFace and how does it work?</strong>
              <p>AniFace is an innovative web application that allows you to create animated versions of faces. It uses advanced facial recognition technology and animation algorithms to bring still images to life, adding expressions, emotions, and movements to the face.</p>
              </li>
              <li style={textStyle}>
              <strong>How do I subscribe for AniFace?</strong>
              <p>To subscribe for AniFace, simply log in to our website and click on the "User Subscription Page" from the drop down menu. You'll be prompted to enter your payment details to subscribe.</p>
              </li>
              <li style={textStyle}>
              <strong>How do I access filters in AniFace?</strong>
              <p>Every day, non-subscribed users receive three free filters to use. These filters can be accessed from your account dashboard after signing in. Subscribed users enjoy unlimited access to all available filters.</p>
              </li>
              <li style={textStyle}>
              <strong>Can I cancel my subscription?</strong>
              <p>Yes, you can cancel your subscription at any time. If you decide that [Your Software Name] is not the right fit for you, you have a 7-day grace period to cancel your subscription with no charges.</p>
              </li>
              <li style={textStyle}>
              <strong>What happens after the 7-day trial period if I don't cancel my subscription?</strong>
              <p>If you don't cancel your subscription within the 7-day trial period, your subscription will automatically renew, and you will be charged according to the subscription plan you selected during sign-up.</p>
              </li>
              <li style={textStyle}>
              <strong>How do I cancel my subscription?</strong>
              <p>To cancel your subscription, log in to your account, go to your account settings, and find the option to cancel the subscription. Follow the on-screen instructions to complete the cancellation process.</p>
              </li>
              <li style={textStyle}>
              <strong>What payment methods are accepted for subscription payments?</strong>
              <p>We accept major credit and debit cards for subscription payments. You can securely enter your payment information during the subscription sign-up process.</p>
              </li>
              <li style={textStyle}>
              <strong>Are there any additional features or updates planned for AniFace?</strong>
              <p>Yes, we are continuously working to improve and expand the features of AniFace. We plan to introduce new filters, animations, and enhancements to provide you with even more creative options for facial animation.</p>
              </li>
              <li style={textStyle}>
              <strong>How can I get in touch with customer support if I have questions or encounter issues?</strong>
              <p>If you have any questions or encounter issues, you can reach out to our customer support team via the "Contact Us" section on our website or by emailing aniface_support@gmail.com. We are here to assist you and address any concerns you may have.</p>
              </li>
              <li style={textStyle}>
              <strong>How do I reset my password?</strong>
              <p>To reset your password, go to the login page and click on the "Forgot Password" link. Follow the instructions sent to your email to create a new password.</p>
              </li>
          </ul>
        </Box>

    </ div>
    </MantineProvider>
  );
}

export default UserFAQPage;