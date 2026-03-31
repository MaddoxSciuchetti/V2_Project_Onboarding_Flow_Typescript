import LoadingAlert from '@/components/alerts/LoadingAlert';
import ModalOverlay from '@/components/modal/ModalOverlay';
import SmallWrapper from '@/components/modal/modalSizes/SmallWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@tanstack/react-router';
import useTemplateIssues from '../hooks/useTemplateIssues';
import TemplateItem from './TemplateItem';

type TemplateDetailPageProps = {
  templateId: string;
};

const TemplateDetailPage = ({ templateId }: TemplateDetailPageProps) => {
  const {
    data,
    isPending,
    isError,
    deleteItem,
    isCreating,
    addOpen,
    setAddOpen,
    title,
    setTitle,
    description,
    setDescription,
    handleAddItem,
  } = useTemplateIssues(templateId);

  const templateItemsByOrder = [...(data?.items ?? [])].sort(
    (left, right) => left.orderIndex - right.orderIndex
  );

  if (isPending) return <LoadingAlert />;
  if (isError || !data) {
    return (
      <div className="mx-auto flex w-5xl flex-col gap-4 p-6 md:max-w-8xl">
        <p className="text-sm text-destructive">
          Vorlage konnte nicht geladen werden.
        </p>
        <Button variant="outline" asChild>
          <Link to="/org-settings" search={{ currentTab: 'templates' }}>
            Zurück
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Vorlage bearbeiten"
      className="mx-auto flex h-full w-5xl flex-col overflow-auto rounded-2xl bg-card p-6 md:max-w-8xl"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <Button variant="ghost" size="sm" className="mb-2 -ml-2" asChild>
            <Link to="/org-settings" search={{ currentTab: 'templates' }}>
              ← Zurück zu Vorlagen
            </Link>
          </Button>
          <h1 className="text-xl font-semibold text-foreground">{data.name}</h1>
          {data.description ? (
            <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
              {data.description}
            </p>
          ) : null}
        </div>
        <Button type="button" onClick={() => setAddOpen(true)}>
          Punkt hinzufügen
        </Button>
      </div>

      <TemplateItem
        templateItemsByOrder={templateItemsByOrder}
        deleteItem={deleteItem}
      />

      {addOpen && (
        <ModalOverlay handleToggle={() => setAddOpen(false)}>
          <SmallWrapper>
            <form
              onSubmit={handleAddItem}
              className="flex w-full flex-col gap-3 text-left"
            >
              <h2 className="text-lg font-semibold">Neuer Punkt</h2>
              <div className="flex flex-col gap-2">
                <Label htmlFor="item-title">Titel</Label>
                <Input
                  id="item-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Kurze Aufgabenbeschreibung"
                  autoFocus
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="item-desc">Beschreibung (optional)</Label>
                <Textarea
                  id="item-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-20 resize-y"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddOpen(false)}
                >
                  Abbrechen
                </Button>
                <Button type="submit" disabled={isCreating || !title.trim()}>
                  {isCreating ? 'Speichern…' : 'Hinzufügen'}
                </Button>
              </div>
            </form>
          </SmallWrapper>
        </ModalOverlay>
      )}
    </div>
  );
};

export default TemplateDetailPage;
