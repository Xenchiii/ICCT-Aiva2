// DELETE: import { useRouter } from 'next/navigation';
// ADD:
import { useNavigate } from 'react-router-dom';

// Inside component:
// DELETE: const router = useRouter();
// ADD:
const navigate = useNavigate();

// Usage:
// DELETE: router.push('/dashboard');
// ADD:
navigate('/dashboard');