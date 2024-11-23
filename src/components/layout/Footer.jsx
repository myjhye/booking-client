export default function Footer() {
    let today = new Date();
  
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-gray-300 py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              &copy; {today.getFullYear()} Hotel Booking Site. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }