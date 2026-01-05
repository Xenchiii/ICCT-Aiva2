import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  BookOpen, 
  TrendingUp, 
  GraduationCap, 
  Shield, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  Award,
  BarChart
} from 'lucide-react';

const HomePage: React.FC = () => {
  const styles = {
    homePage: {
      minHeight: '100vh',
      width: '100%',
      background: '#ffffff',
    },
    // Hero Section
    heroSection: {
      position: 'relative' as const,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'hidden',
      padding: '2rem',
    },
    heroBackground: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)',
    },
    heroContent: {
      position: 'relative' as const,
      zIndex: 1,
      maxWidth: '1200px',
      width: '100%',
      textAlign: 'center' as const,
      color: 'white',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '2rem',
    },
    heroLogo: {
      width: '80px',
      height: '80px',
      filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))',
    },
    brandName: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    heroTitle: {
      fontSize: '4rem',
      fontWeight: 800,
      marginBottom: '1.5rem',
      lineHeight: '1.1',
      textShadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
      letterSpacing: '-0.02em',
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      marginBottom: '3rem',
      opacity: 0.95,
      maxWidth: '700px',
      margin: '0 auto 3rem',
      lineHeight: '1.6',
    },
    ctaButtons: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap' as const,
    },
    btnBase: {
      padding: '1.2rem 2.5rem',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    btnPrimary: {
      background: 'white',
      color: '#667eea',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
    },
    btnSecondary: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(10px)',
    },
    // Stats Section
    statsSection: {
      background: '#f8f9fa',
      padding: '4rem 2rem',
      borderBottom: '1px solid #e9ecef',
    },
    statsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
    },
    statCard: {
      textAlign: 'center' as const,
      padding: '2rem',
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#667eea',
      marginBottom: '0.5rem',
    },
    statLabel: {
      fontSize: '1.1rem',
      color: '#666',
      fontWeight: 500,
    },
    // Features Section
    featuresSection: {
      padding: '6rem 2rem',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    sectionHeader: {
      textAlign: 'center' as const,
      marginBottom: '4rem',
    },
    sectionBadge: {
      display: 'inline-block',
      padding: '0.5rem 1rem',
      background: '#f0f3ff',
      color: '#667eea',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    sectionTitle: {
      fontSize: '3rem',
      fontWeight: 700,
      marginBottom: '1rem',
      color: '#1a202c',
      letterSpacing: '-0.02em',
    },
    sectionSubtitle: {
      fontSize: '1.3rem',
      color: '#666',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
    },
    featureCard: {
      background: 'white',
      padding: '2.5rem',
      borderRadius: '16px',
      border: '1px solid #e9ecef',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    featureCardGlow: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease',
    },
    featureIconWrapper: {
      width: '60px',
      height: '60px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
    },
    featureTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#1a202c',
      fontWeight: 600,
    },
    featureText: {
      color: '#666',
      lineHeight: '1.7',
      fontSize: '1rem',
    },
    // Benefits Section
    benefitsSection: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '6rem 2rem',
      color: 'white',
    },
    benefitsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
    },
    benefitItem: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
    },
    benefitIcon: {
      flexShrink: 0,
      marginTop: '0.25rem',
    },
    benefitText: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      opacity: 0.95,
    },
    // CTA Section
    ctaSection: {
      padding: '6rem 2rem',
      textAlign: 'center' as const,
      background: '#f8f9fa',
    },
    ctaContent: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
      color: '#1a202c',
    },
    ctaText: {
      fontSize: '1.2rem',
      color: '#666',
      marginBottom: '2.5rem',
      lineHeight: '1.7',
    },
    btnLarge: {
      padding: '1.5rem 3rem',
      fontSize: '1.2rem',
    },
  };

  const features = [
    {
      icon: <Bot size={28} color="white" />,
      title: 'AI Virtual Assistant',
      text: 'Get personalized help 24/7 from Aiva, your intelligent learning companion powered by advanced AI technology.'
    },
    {
      icon: <BookOpen size={28} color="white" />,
      title: 'Course Management',
      text: 'Access and organize all your courses in one centralized platform with intuitive navigation and smart organization.'
    },
    {
      icon: <TrendingUp size={28} color="white" />,
      title: 'Performance Analytics',
      text: 'Track your progress with detailed insights, visualizations, and personalized recommendations for improvement.'
    },
    {
      icon: <GraduationCap size={28} color="white" />,
      title: 'Smart Grading',
      text: 'AI-powered automated grading with instant, detailed feedback to help you learn from every assignment.'
    },
    {
      icon: <Shield size={28} color="white" />,
      title: 'Secure Proctoring',
      text: 'Advanced exam monitoring with face recognition and behavior detection for academic integrity.'
    },
    {
      icon: <Sparkles size={28} color="white" />,
      title: 'Predictive Insights',
      text: 'AI-driven predictions to identify at-risk students early and provide timely intervention.'
    }
  ];

  const benefits = [
    '24/7 AI-powered support',
    'Real-time collaboration tools',
    'Advanced analytics dashboard',
    'Mobile-friendly interface',
    'Secure cloud storage',
    'Automated workflows'
  ];

  return (
    <div style={styles.homePage}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroBackground}></div>
        <div style={styles.heroContent}>
          <div style={styles.logoContainer}>
            <img 
              src="/assets/logos/logo.svg" 
              alt="ICCT-Aiva" 
              style={styles.heroLogo}
            />
            <span style={styles.brandName}>ICCT-Aiva</span>
          </div>
          
          <h1 style={styles.heroTitle}>
            The Future of<br />Learning Management
          </h1>
          <p style={styles.heroSubtitle}>
            Experience the next generation of education with AI-powered tools, 
            intelligent analytics, and seamless collaboration.
          </p>
          
          <div style={styles.ctaButtons}>
            <Link 
              to="/register" 
              style={{...styles.btnBase, ...styles.btnPrimary}}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.15)';
              }}
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/login" 
              style={{...styles.btnBase, ...styles.btnSecondary}}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Sign In
              <Zap size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <Users size={40} color="#667eea" style={{marginBottom: '1rem'}} />
            <div style={styles.statNumber}>10K+</div>
            <div style={styles.statLabel}>Active Students</div>
          </div>
          <div style={styles.statCard}>
            <BookOpen size={40} color="#667eea" style={{marginBottom: '1rem'}} />
            <div style={styles.statNumber}>500+</div>
            <div style={styles.statLabel}>Courses Available</div>
          </div>
          <div style={styles.statCard}>
            <Award size={40} color="#667eea" style={{marginBottom: '1rem'}} />
            <div style={styles.statNumber}>95%</div>
            <div style={styles.statLabel}>Satisfaction Rate</div>
          </div>
          <div style={styles.statCard}>
            <BarChart size={40} color="#667eea" style={{marginBottom: '1rem'}} />
            <div style={styles.statNumber}>98%</div>
            <div style={styles.statLabel}>Success Rate</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>POWERFUL FEATURES</span>
          <h2 style={styles.sectionTitle}>Everything You Need to Succeed</h2>
          <p style={styles.sectionSubtitle}>
            Cutting-edge tools and features designed to enhance learning, 
            improve outcomes, and streamline education management.
          </p>
        </div>
        
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={styles.featureCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                const glow = e.currentTarget.querySelector('.feature-glow') as HTMLElement;
                if (glow) glow.style.transform = 'scaleX(1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                const glow = e.currentTarget.querySelector('.feature-glow') as HTMLElement;
                if (glow) glow.style.transform = 'scaleX(0)';
              }}
            >
              <div className="feature-glow" style={styles.featureCardGlow}></div>
              <div style={styles.featureIconWrapper}>
                {feature.icon}
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureText}>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.benefitsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Why Choose ICCT-Aiva?</h2>
          <p style={styles.sectionSubtitle}>
            Join thousands of students and educators who trust our platform
          </p>
        </div>
        
        <div style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <div key={index} style={styles.benefitItem}>
              <div style={styles.benefitIcon}>
                <CheckCircle size={24} />
              </div>
              <div style={styles.benefitText}>{benefit}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Learning Experience?</h2>
          <p style={styles.ctaText}>
            Join ICCT-Aiva today and discover how AI can revolutionize the way you learn, 
            teach, and manage educational content.
          </p>
          <Link 
            to="/register" 
            style={{...styles.btnBase, ...styles.btnPrimary, ...styles.btnLarge}}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(102, 126, 234, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.15)';
            }}
          >
            Start Learning Today
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;