import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

function BSBHomePage() {
  const navigate = useNavigate({ from: '/' });
  return (
    <div>
      <h1>Placeholder for creating a awesome landing page for the product</h1>
      <p>Welcome to the BSB Home Page!</p>
      <Button onClick={() => navigate({ to: '/login' })}>
        Go to the login Page
      </Button>
    </div>
  );
}

export default BSBHomePage;
