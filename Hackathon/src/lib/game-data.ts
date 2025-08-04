
export type GameItem = {
  id: number;
  type: 'email' | 'sms';
  sender: string;
  subject?: string;
  content: string;
  isPhishing: boolean;
  explanation?: string;
};

export const gameData: GameItem[] = [
  {
    id: 1,
    type: 'email',
    sender: 'support@yourbank-alerts.com',
    subject: 'Urgent: Your Account is Suspended!',
    content: 'Dear customer, we have detected suspicious activity on your account. To protect your funds, we have temporarily suspended it. Please click here to verify your identity and restore access: http://yourbank-verify-now.xyz/login',
    isPhishing: true,
    explanation: 'The suspicious link and urgent tone are common signs of phishing.',
  },
  {
    id: 2,
    type: 'sms',
    sender: '+1-555-123-4567',
    content: 'Your package from ExpressDelivery is scheduled for delivery today. Track it here: https://bit.ly/track-ur-pkg',
    isPhishing: false,
  },
  {
    id: 3,
    type: 'email',
    sender: 'promotions@shop-great-deals.net',
    subject: 'You have WON a $1000 Gift Card!',
    content: 'Congratulations! You have been selected to receive a $1000 gift card. To claim your prize, please provide your shipping details and a small processing fee of $1.99. Click here: http://get-your-prize-fast.info',
    isPhishing: true,
    explanation: 'Offers that are too good to be true and require a fee are typical scams.'
  },
  {
    id: 4,
    type: 'email',
    sender: 'hr@corporate-co.com',
    subject: 'Action Required: Annual Performance Review',
    content: 'Hi Team, just a reminder that your annual performance reviews are due next Friday. Please log in to the employee portal to complete your self-assessment. Let me know if you have any questions. Thanks!',
    isPhishing: false,
  },
];
