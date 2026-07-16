import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerified: () => void;
  onDenied: () => void;
}

export function AgeVerificationModal({ isOpen, onVerified, onDenied }: AgeVerificationModalProps) {
  const handleVerify = () => {
    sessionStorage.setItem('ageVerified', 'true');
    onVerified();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-md border-battles-gold/30 bg-battles-black text-white opacity-100 !duration-0 !animate-none data-[state=open]:!animate-none data-[state=open]:!opacity-100 data-[state=closed]:!animate-none"
        hideClose
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-bold text-battles-gold">Welcome to Battles Budz</DialogTitle>
          <DialogDescription className="text-sm leading-6 text-zinc-300">
            You must be 21 or older and consent to view cannabis-related material to enter this website.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 text-center">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="p-4 rounded-full bg-battles-gold/20">
                <Leaf className="h-12 w-12 text-battles-gold" aria-hidden="true" />
              </div>
            </div>
            <div>
              <p className="text-xl text-white mb-4">Are you 21 years or older?</p>
              <p className="text-sm text-zinc-300">
                You must be 21+ to enter this cannabis website as required by New York State law.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={onDenied}
              variant="outline"
              className="flex-1 border-red-300 bg-black font-semibold text-red-100 hover:border-red-200 hover:bg-red-950 hover:text-white"
            >
              No, I'm under 21
            </Button>
            
            <Button
              type="button"
              onClick={handleVerify}
              className="flex-1 bg-yellow-300 font-semibold text-black hover:bg-yellow-200"
            >
              Yes, I'm 21+
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
