import { DNA } from 'react-loader-spinner';

export default function DNALoader() {
  return (
    <div className="flex justify-center items-center h-fit md:h-screen">
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
