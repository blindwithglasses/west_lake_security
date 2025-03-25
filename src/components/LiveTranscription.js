// 集成恒脑语音识别引擎
const LiveTranscription = ({ onTranscriptionReady }) => {
  const [transcript, setTranscript] = useState('');

  const handleAudioStream = (stream) => {
    const processor = window.hengnao.createAudioProcessor({
      sampleRate: 16000,
      securityLevel: 'high'
    });

    processor.on('transcript', (text) => {
      const sanitizedText = window.hengnao.sanitizeOutput(text);
      setTranscript(sanitizedText);
      onTranscriptionReady(sanitizedText);
    });
  };

  return (
    <div className="transcription-box">
      <button onClick={handleAudioStream}>开始录音</button>
      <div className="transcript-output">{transcript}</div>
    </div>
  );
};