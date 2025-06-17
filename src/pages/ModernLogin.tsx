
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Lock, Eye, EyeOff, Mail, Phone, Shield } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export const ModernLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans votre espace CnssApp",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Vérifiez vos identifiants et réessayez",
        variant: "destructive",
      });
    }
  };

  const quickLoginButtons = [
    { email: 'employeur@mukendi.cd', password: 'emp123456', role: 'Employeur', color: 'bg-blue-500' },
    { email: 'agent@cnss-kamina.cd', password: 'agent123', role: 'Agent SES', color: 'bg-green-500' },
    { email: 'chef@cnss-kamina.cd', password: 'chef123', role: 'Chef SES', color: 'bg-purple-500' },
    { email: 'admin@cnss-kamina.cd', password: 'admin2024', role: 'Admin', color: 'bg-red-500' },
  ];

  const quickLogin = async (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
    
    const success = await login(testEmail, testPassword);
    
    if (success) {
      toast({
        title: "Connexion test réussie",
        description: "Bienvenue dans votre espace CnssApp",
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cnss-blue via-cnss-blue-dark to-purple-900 px-4 relative overflow-hidden">
      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo et marque améliorés */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-white to-cnss-blue-light rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-cnss-blue font-bold text-3xl">C</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="h-4 w-4 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2">CnssApp</h1>
          <p className="text-white/80 text-lg">
            Caisse Nationale de Sécurité Sociale
          </p>
          <p className="text-white/60 text-sm">Kamina - République Démocratique du Congo</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-md">
            <TabsTrigger value="login" className="text-white data-[state=active]:bg-white data-[state=active]:text-cnss-blue">
              Connexion
            </TabsTrigger>
            <TabsTrigger value="demo" className="text-white data-[state=active]:bg-white data-[state=active]:text-cnss-blue">
              Démo rapide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800">Connexion sécurisée</CardTitle>
                <CardDescription className="text-gray-600">
                  Accédez à votre espace de déclarations CNSS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Adresse email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-11 h-12 border-gray-300 focus:border-cnss-blue transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-11 pr-11 h-12 border-gray-300 focus:border-cnss-blue transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cnss-blue transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-cnss-blue to-cnss-blue-dark hover:from-cnss-blue-dark hover:to-cnss-blue text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Connexion...</span>
                      </div>
                    ) : (
                      'Se connecter'
                    )}
                  </Button>
                </form>

                <div className="mt-6 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Liens utiles</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <a href="#" className="text-cnss-blue hover:underline font-medium">
                      Mot de passe oublié ?
                    </a>
                    <a href="#" className="text-cnss-blue hover:underline font-medium">
                      Créer un compte
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800">Accès démo</CardTitle>
                <CardDescription className="text-gray-600">
                  Testez l'application avec différents rôles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickLoginButtons.map((btn, index) => (
                    <Button
                      key={index}
                      onClick={() => quickLogin(btn.email, btn.password)}
                      className={`w-full h-12 ${btn.color} hover:opacity-90 text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-105`}
                      disabled={isLoading}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Se connecter comme {btn.role}
                    </Button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">💡 Identifiants de test :</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Employeur :</strong> employeur@mukendi.cd / emp123456</p>
                    <p><strong>Agent SES :</strong> agent@cnss-kamina.cd / agent123</p>
                    <p><strong>Chef SES :</strong> chef@cnss-kamina.cd / chef123</p>
                    <p><strong>Admin :</strong> admin@cnss-kamina.cd / admin2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-white/60">
          <p>© 2024 CNSS Kamina - Tous droits réservés</p>
          <p>Application sécurisée développée pour la RDC</p>
        </div>
      </div>
    </div>
  );
};
