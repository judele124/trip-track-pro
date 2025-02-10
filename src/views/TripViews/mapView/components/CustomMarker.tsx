import Icon, { IconName } from '@/components/icons/Icon';

export default function CustomMarker({
	experienceName,
}: {
	experienceName: IconName;
}) {
	return <Icon size='40' name={experienceName} />;
}
