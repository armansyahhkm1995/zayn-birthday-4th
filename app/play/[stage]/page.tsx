import { notFound } from "next/navigation";
import { StageController } from "../../../src/components/screens/stage-controller";
import { stageDefinitions } from "../../../src/data/stages";

export function generateStaticParams() {
  return stageDefinitions
    .filter((stage) => stage.id !== "start")
    .map((stage) => ({ stage: stage.id }));
}

export default async function PlayStagePage({
  params,
}: {
  params: Promise<{ stage: string }>;
}) {
  const { stage } = await params;

  const selectedStage = stageDefinitions.find((entry) => entry.id === stage);

  if (!selectedStage) {
    notFound();
  }

  return <StageController stage={selectedStage} />;
}
