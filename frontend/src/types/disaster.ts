export type DisasterType = 'Flood' | 'Cyclone' | 'Earthquake' | 'Landslide' | 'Fire' | 'Heatwave';

export interface ActionStep {
  text: string;
  urgent?: boolean;
}

export interface DisasterGuide {
  id: string;
  disasterType: string;
  title: string;
  summary: string;
  iconName: string;
  severityRisk: string;
  beforeSteps: ActionStep[];
  duringSteps: ActionStep[];
  afterSteps: ActionStep[];
  avoidItems: string[];
  translations?: Partial<Record<string, {
    title?: string;
    summary?: string;
    severityRisk?: string;
    beforeSteps?: ActionStep[];
    duringSteps?: ActionStep[];
    afterSteps?: ActionStep[];
    avoidItems?: string[];
  }>>;
}

export interface Disaster {
  id: string;
  type: DisasterType;
  title: string;
  description: string;
  severityRisk: string;
}
