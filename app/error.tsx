'use client'


export default function Error() {
    return <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
    <div className="bg-red-500 text-white p-6 rounded shadow-lg flex flex-col items-center font-roboto">
        <span className="text-5xl mb-4">😢</span> {/* Sad emoji */}
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p className="text-center">Something wrong !</p>
    </div>
</div>
    
    
  
}