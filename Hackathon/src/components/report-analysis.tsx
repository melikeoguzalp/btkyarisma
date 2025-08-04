
import type { AnalyzePhishingReportOutput } from '@/ai/flows/analyze-phishing-report';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle2, ShieldBan, Info, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

type ReportAnalysisProps = {
  result: AnalyzePhishingReportOutput;
};

const RISK_THRESHOLD = 0.5;

export function ReportAnalysis({ result }: ReportAnalysisProps) {
  const { phishingScore, reason, reportingAdvice } = result;
  const isPhishing = phishingScore >= RISK_THRESHOLD;
  const scorePercent = Math.round(phishingScore * 100);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(localStorage.getItem('language') || 'en');
  }, []);

  const getProgressColor = () => {
    if (phishingScore < 0.4) return '[&>div]:bg-green-600';
    if (phishingScore < 0.7) return '[&>div]:bg-yellow-500';
    return '[&>div]:bg-destructive';
  }

  return (
    <Card className={cn(
      "shadow-lg transition-all animate-in fade-in-50 slide-in-from-bottom-5",
      isPhishing ? "bg-destructive/10 border-destructive" : "bg-green-600/10 border-green-600"
    )}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-headline">
          {language === 'en' ? 'Analysis Result' : 'Analiz Sonucu'}
        </CardTitle>
        <Badge variant={isPhishing ? 'destructive' : 'default'} className={cn("text-base", !isPhishing && "bg-green-600 hover:bg-green-700")}>
          {isPhishing ? 
            <><ShieldBan className="mr-2 h-4 w-4" />{language === 'en' ? 'High Risk' : 'Yüksek Risk'}</> :
            <><CheckCircle2 className="mr-2 h-4 w-4" />{language === 'en' ? 'Low Risk' : 'Düşük Risk'}</>
          }
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-card-foreground/80">{language === 'en' ? 'Risk Score' : 'Risk Skoru'}</h3>
            <span className={cn("font-bold text-lg", isPhishing ? "text-destructive" : "text-green-600")}>{scorePercent}%</span>
          </div>
          <Progress value={scorePercent} className={getProgressColor()} />
        </div>

        <div className="space-y-2">
           <h3 className="font-semibold text-card-foreground/80 flex items-center gap-2"><Info className="h-5 w-5"/>{language === 'en' ? 'Reasoning' : 'Gerekçe'}</h3>
           <p className="text-card-foreground/90 p-4 bg-background/50 rounded-md border">{reason}</p>
        </div>
        
        {isPhishing && reportingAdvice && (
          <div className="space-y-2">
            <h3 className="font-semibold text-card-foreground/80 flex items-center gap-2"><AlertTriangle className="h-5 w-5"/>{language === 'en' ? 'How to Report' : 'Nasıl Şikayet Edilir'}</h3>
            <p className="text-card-foreground/90 p-4 bg-background/50 rounded-md border">{reportingAdvice}</p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
