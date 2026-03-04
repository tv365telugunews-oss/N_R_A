import { useState } from "react";
import { MapPin, ChevronDown, Navigation, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import indianLocationData from "@/data/indianLocations";
import { useGeolocation } from "@/app/hooks/useGeolocation";

interface LocationSelectorProps {
  onLocationChange: (state: string, district: string, mandal: string) => void;
  currentLocation: {
    state: string;
    district: string;
    mandal: string;
  };
}

export function LocationSelector({ onLocationChange, currentLocation }: LocationSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(currentLocation.state);
  const [selectedDistrict, setSelectedDistrict] = useState(currentLocation.district);
  const [selectedMandal, setSelectedMandal] = useState(currentLocation.mandal);
  const { loading, error, getCurrentLocation, clearError } = useGeolocation();

  const states = Object.keys(indianLocationData);
  const districts = selectedState ? Object.keys(indianLocationData[selectedState as keyof typeof indianLocationData] || {}) : [];
  const mandals = selectedState && selectedDistrict
    ? (indianLocationData[selectedState as keyof typeof indianLocationData]?.[selectedDistrict as keyof typeof indianLocationData[keyof typeof indianLocationData]] || [])
    : [];

  const handleUseMyLocation = async () => {
    clearError();
    try {
      const location = await getCurrentLocation();
      if (location) {
        setSelectedState(location.state);
        setSelectedDistrict(location.district);
        setSelectedMandal(location.city);
      }
    } catch (err) {
      // Error is already handled in the hook
      console.error('Location error:', err);
    }
  };

  const handleApply = () => {
    onLocationChange(selectedState, selectedDistrict, selectedMandal);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-xs bg-white/10 backdrop-blur-md hover:bg-white/20"
        >
          <MapPin className="h-4 w-4" />
          <span className="max-w-[120px] truncate">
            {currentLocation.mandal || currentLocation.district || "Select Location"}
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Your Location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* GPS Auto-Detect Button */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
            <Button
              onClick={handleUseMyLocation}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Detecting Location...
                </>
              ) : (
                <>
                  <Navigation className="h-5 w-5 mr-2" />
                  📍 Use My Current Location
                </>
              )}
            </Button>
            {error && (
              <div className="mt-3 flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            <p className="text-xs text-gray-600 mt-3 text-center">
              Auto-detect your location using GPS
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500 font-semibold">Or Select Manually</span>
            </div>
          </div>

          {/* State Selection */}
          <div>
            <label className="text-sm mb-2 block font-medium">State / Union Territory</label>
            <Select value={selectedState} onValueChange={(value) => {
              setSelectedState(value);
              setSelectedDistrict("");
              setSelectedMandal("");
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* District Selection */}
          <div>
            <label className="text-sm mb-2 block font-medium">District</label>
            <Select
              value={selectedDistrict}
              onValueChange={(value) => {
                setSelectedDistrict(value);
                setSelectedMandal("");
              }}
              disabled={!selectedState}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedState && (
              <p className="text-xs text-gray-500 mt-1">
                {districts.length} districts available
              </p>
            )}
          </div>

          {/* Mandal/Village Selection */}
          <div>
            <label className="text-sm mb-2 block font-medium">City / Town / Mandal</label>
            <Select
              value={selectedMandal}
              onValueChange={setSelectedMandal}
              disabled={!selectedDistrict}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select City/Town" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {mandals.map((mandal) => (
                  <SelectItem key={mandal} value={mandal}>
                    {mandal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDistrict && (
              <p className="text-xs text-gray-500 mt-1">
                {mandals.length} cities/towns available
              </p>
            )}
          </div>

          <Button onClick={handleApply} className="w-full bg-primary hover:bg-primary/90">
            Apply Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}